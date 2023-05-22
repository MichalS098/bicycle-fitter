/**
 * @fileoverview This file contains helper functions for the MediaPipe pose library, for example, to measure distance between two points. 
 */

import {
    POSE_LANDMARKS,
    POSE_LANDMARKS_LEFT,
    POSE_LANDMARKS_RIGHT,
    NormalizedLandmark,
    Results,
} from '@mediapipe/pose';
import { median } from '@/helpers/mathHelpers';
import { getUserFromDatabase } from '@/helpers/helpersDataBase'
import { multiplierForMediaPipe } from '@/classes/multiplierForMediaPipe';

export class BodyParamsFromMediapipe {
    constructor(
        public shoulderHeight: number,
        public footLength: number,
        public armLength: number,
        public shankLength: number,
        public thighLength: number,
        public inseamLength: number,
    ) { }
}

let overallHeight: number;
const thighLengthMultiplier = new multiplierForMediaPipe(1.18, 1.045, 1.047, 1.089, 1.1)
const inseamLengthMultiplier = new multiplierForMediaPipe(0.9, 0.98, 0.93, 0.92, 0.9)
const shoulderToHipMultiplier = new multiplierForMediaPipe(0.97, 0.96, 1.083, 0.8, 0.78)
const shoulderHeightMultiplier = new multiplierForMediaPipe(1.12, 1.15, 1.088, 1.088, 1.08)
const leftElbowToLeftWristMultiplier = new multiplierForMediaPipe(0.78, 0.69, 0.7, 0.63, 0.6)
const leftElbowToLeftShoulderMultiplier = new multiplierForMediaPipe(0.77, 0.6, 0.68, 0.6, 0.58)
const armLengthMultiplier = new multiplierForMediaPipe(1.015, 0.96, 0.95, 0.95, 0.95)

function shankLengthCorrect(shankLengthTemp: number): number {
    const multiplier = 0.0089 * overallHeight - 0.4398;

    return shankLengthTemp * multiplier;
}

function getDistanceBetweenPoints(point1: NormalizedLandmark, point2: NormalizedLandmark): number {
    const x1 = point1.x;
    const y1 = point1.y;
    const z1 = point1.z;
    const x2 = point2.x;
    const y2 = point2.y;
    const z2 = point2.z;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

    return distance;
}


function theHeightOfTheTriangle(firstSideOfTriangle: number, secondSideOfTriangle: number, thirdSideOfTriangle: number): number {
    const S = (firstSideOfTriangle + secondSideOfTriangle + thirdSideOfTriangle) / 2
    const A = Math.sqrt(S * (S - firstSideOfTriangle) * (S - secondSideOfTriangle) * (S - thirdSideOfTriangle))
    const H = (2 * A) / firstSideOfTriangle

    return H
}


function getAngleBetweenPoints(point1: NormalizedLandmark, point2: NormalizedLandmark, point3: NormalizedLandmark) {
    const a = getDistanceBetweenPoints(point1, point2);
    const b = getDistanceBetweenPoints(point2, point3);
    const c = getDistanceBetweenPoints(point3, point1);
    const angle = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c));

    return angle;
}

function hFoot(results: Results): [number, number] {
    let firstSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX]);
    let secondSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX]);
    let thirdSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE]);
    const hFootLeft = theHeightOfTheTriangle(firstSideOfTriangle, secondSideOfTriangle, thirdSideOfTriangle)

    firstSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX]);
    secondSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX]);
    thirdSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE]);
    const hFootRight = theHeightOfTheTriangle(firstSideOfTriangle, secondSideOfTriangle, thirdSideOfTriangle)

    return [hFootLeft, hFootRight]

}


export function getBodyParamsFromMediapipeResultsWithCorrect(results: Results, overallHeightTemp: number): BodyParamsFromMediapipe {

    overallHeight = overallHeightTemp;

    const left_hip_to_knee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE]);
    const right_hip_to_knee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE]);
    const left_knee_to_ankle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE]);
    const right_knee_to_ankle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE]);
    const left_ankle_to_foot_index = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX]);
    const right_ankle_to_foot_index = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX]);

    const [hFootLeft, hFootRight] = hFoot(results);

    /**/

    const leftKneeToLeftHip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]);
    const rightKneeToRightHip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP]);

    let thighLengthTemp = (leftKneeToLeftHip + rightKneeToRightHip) / 2

    thighLengthTemp = thighLengthMultiplier.correctValue(overallHeight, thighLengthTemp);

    /**/

    /**/

    const leftAnkleToLeftKnee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE]);
    const rightAnkleToRightKnee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE]);

    let shankLengthTemp = (leftAnkleToLeftKnee + rightAnkleToRightKnee) / 2

    shankLengthTemp = shankLengthCorrect(shankLengthTemp);

    /**/

    let inseamLengthTemp = shankLengthTemp + thighLengthTemp
    inseamLengthTemp = inseamLengthMultiplier.correctValue(overallHeight, inseamLengthTemp)

    /**/
    let left_shoulder_to_hip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]);
    left_shoulder_to_hip = shoulderToHipMultiplier.correctValue(overallHeight, left_shoulder_to_hip)

    let right_shoulder_to_hip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER], results.poseWorldLandmarks[POSE_LANDMARKS.RIGHT_HIP]);
    right_shoulder_to_hip = shoulderToHipMultiplier.correctValue(overallHeight, right_shoulder_to_hip)

    let shoulderHeightTemp = shoulderHeightCorrect(left_shoulder_to_hip,
        right_shoulder_to_hip,
        thighLengthTemp,
        shankLengthTemp,
        hFootLeft,
        hFootRight)

    shoulderHeightTemp = shoulderHeightMultiplier.correctValue(overallHeight, shoulderHeightTemp);

    /* */

    let leftElbowToLeftShoulder = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER]);
    leftElbowToLeftShoulder = leftElbowToLeftShoulderMultiplier.correctValue(overallHeight, leftElbowToLeftShoulder);

    let leftElbowToLeftWrist = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_WRIST]);
    leftElbowToLeftWrist = leftElbowToLeftWristMultiplier.correctValue(overallHeight, leftElbowToLeftWrist);

    let armLengthTemp = armLength(leftElbowToLeftShoulder + leftElbowToLeftWrist);
    armLengthTemp = armLengthMultiplier.correctValue(overallHeight, armLengthTemp);

    const leftFootLength = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL]);
    const rightFootLength = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL]);
    const footLengthTemp = footLength(leftFootLength, rightFootLength)

    return new BodyParamsFromMediapipe(shoulderHeightTemp, footLengthTemp, armLengthTemp, shankLengthTemp, thighLengthTemp, inseamLengthTemp);
}

export async function getBodyParamsFromMediapipeResults(results: Results): Promise<BodyParamsFromMediapipe> {

    const left_shoulder_to_hip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]);
    const right_shoulder_to_hip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER], results.poseWorldLandmarks[POSE_LANDMARKS.RIGHT_HIP]);
    const left_hip_to_knee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE]);
    const right_hip_to_knee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE]);
    const left_knee_to_ankle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE]);
    const right_knee_to_ankle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE]);
    const left_ankle_to_foot_index = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX]);
    const right_ankle_to_foot_index = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX]);

    let firstSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX]);
    let secondSideOfTriangle = left_ankle_to_foot_index
    let thirdSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE]);
    const hFootLeft = theHeightOfTheTriangle(firstSideOfTriangle, secondSideOfTriangle, thirdSideOfTriangle)

    firstSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX]);
    secondSideOfTriangle = right_ankle_to_foot_index
    thirdSideOfTriangle = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE]);
    const hFootRight = theHeightOfTheTriangle(firstSideOfTriangle, secondSideOfTriangle, thirdSideOfTriangle)

    const shoulderHeightTemp = await shoulderHeight(left_shoulder_to_hip,
        right_shoulder_to_hip,
        left_hip_to_knee,
        right_hip_to_knee,
        left_knee_to_ankle,
        right_knee_to_ankle,
        hFootLeft,
        hFootRight)

    const leftFootLength = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL]);
    const rightFootLength = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL]);

    const footLengthTemp = footLength(leftFootLength, rightFootLength)

    const leftElbowToLeftShoulder = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER]);
    const rightElbowToRightShoulder = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER]);

    const leftElbowToLeftWrist = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_WRIST]);
    const rightElbowToRightWrist = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_WRIST]);

    const user = await getUserFromDatabase();
    if (user != null) {
        user.leftElbowToLeftShoulder = leftElbowToLeftShoulder;
        user.rightElbowToRightShoulder = rightElbowToRightShoulder;
        user.leftElbowToLeftWrist = leftElbowToLeftWrist;
        user.rightElbowToRightWrist = rightElbowToRightWrist;

        await user.save();
    }

    // const armLengthTemp = armLength(leftElbowToLeftShoulder + leftElbowToLeftWrist, rightElbowToRightShoulder + rightElbowToRightWrist);

    // Zmiana bo rightElbowToRightWrist zawsze wychodził 0.04m i chuj wie czemu

    const armLengthTemp = leftElbowToLeftShoulder + leftElbowToLeftWrist;

    const leftAnkleToLeftKnee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE]);
    const rightAnkleToRightKnee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE]);

    const shankLengthTemp = (leftAnkleToLeftKnee + rightAnkleToRightKnee) / 2

    const leftKneeToLeftHip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]);
    const rightKneeToRightHip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP]);
    const thighLengthTemp = (leftKneeToLeftHip + rightKneeToRightHip) / 2

    const inseamLengthTemp = shankLengthTemp + thighLengthTemp //narazie taki szacunek inseamLength to jeszcze do uzgodnienia 
    
    return new BodyParamsFromMediapipe(shoulderHeightTemp, footLengthTemp, armLengthTemp, shankLengthTemp, thighLengthTemp, inseamLengthTemp);
}

function shoulderHeightCorrect(left_shoulder_to_hip: number,
    right_shoulder_to_hip: number,
    thighLengthTemp: number,
    shankLengthTemp: number,
    left_ankle_to_foot_index: number,
    right_ankle_to_foot_index: number): number {

    const left_height = left_shoulder_to_hip + thighLengthTemp + shankLengthTemp + left_ankle_to_foot_index;
    const right_height = right_shoulder_to_hip + thighLengthTemp + shankLengthTemp + right_ankle_to_foot_index;

    return (left_height + right_height) / 2;
}

async function shoulderHeight(left_shoulder_to_hip: number,
    right_shoulder_to_hip: number,
    left_hip_to_knee: number,
    right_hip_to_knee: number,
    left_knee_to_ankle: number,
    right_knee_to_ankle: number,
    left_ankle_to_foot_index: number,
    right_ankle_to_foot_index: number): Promise<number> {

    const left_height = left_shoulder_to_hip + left_hip_to_knee + left_knee_to_ankle + left_ankle_to_foot_index;
    const right_height = right_shoulder_to_hip + right_hip_to_knee + right_knee_to_ankle + right_ankle_to_foot_index;

    console.log("left_height: ", left_height)
    console.log("left_shoulder_to_hip: ", left_shoulder_to_hip)
    console.log("left_hip_to_knee: ", left_hip_to_knee)
    console.log("left_knee_to_ankle: ", left_knee_to_ankle)
    console.log("left_ankle_to_foot_index: ", left_ankle_to_foot_index)


    console.log("right_height: ", right_height)
    console.log("right_shoulder_to_hip: ", right_shoulder_to_hip)
    console.log("right_hip_to_knee: ", right_hip_to_knee)
    console.log("right_knee_to_ankle: ", right_knee_to_ankle)
    console.log("right_ankle_to_foot_index: ", right_ankle_to_foot_index)


    const user = await getUserFromDatabase();
    if (user != null) {
        user.left_ankle_to_foot_index = left_ankle_to_foot_index;
        user.left_hip_to_knee = left_hip_to_knee;
        user.left_knee_to_ankle = left_knee_to_ankle;
        user.left_shoulder_to_hip = left_shoulder_to_hip;

        user.right_ankle_to_foot_index = right_ankle_to_foot_index;
        user.right_hip_to_knee = right_hip_to_knee;
        user.right_knee_to_ankle = right_knee_to_ankle;
        user.right_shoulder_to_hip = right_shoulder_to_hip;
        await user.save();
    }



    return (left_height + right_height) / 2;
}

function footLength(leftFootLength: number, rightFootLength: number): number {

    return (leftFootLength + rightFootLength) / 2;
}

function armLength(leftElbowToLeftShoulder: number): number {

    return (leftElbowToLeftShoulder );
}

export function getBodyParamsMedian(bodyParams: BodyParamsFromMediapipe[]): BodyParamsFromMediapipe {
    const shoulderHeight = median(bodyParams.map((bodyParam) => bodyParam.shoulderHeight));
    const footLength = median(bodyParams.map((bodyParam) => bodyParam.footLength));
    const armLength = median(bodyParams.map((bodyParam) => bodyParam.armLength));
    const shankLength = median(bodyParams.map((bodyParam) => bodyParam.shankLength));
    const thighLength = median(bodyParams.map((bodyParam) => bodyParam.thighLength));
    const inseamLength = median(bodyParams.map((bodyParam) => bodyParam.inseamLength));

    return new BodyParamsFromMediapipe(shoulderHeight, footLength, armLength, shankLength, thighLength, inseamLength);
}