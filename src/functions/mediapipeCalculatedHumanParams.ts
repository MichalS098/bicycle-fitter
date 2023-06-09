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

export class BodyAnglesFromMediapipe {
    constructor(
        public footFloorAngle: number,
        public thighShankAngle: number,
        public torsoFloorAngle: number,
        public torsoBicepAngle: number,
        public bicepForearmAngle: number,
        public crankAngle: number
    ) { }
}

export class BodyAnglesMaxMin {
    constructor(
        public footFloorAngleMax: number,
        public footFloorAngleMin: number,
        public thighShankAngleMax: number,
        public thighShankAngleMin: number,
        public torsoFloorAngleMax: number,
        public torsoFloorAngleMin: number,
        public torsoBicepAngleMax: number,
        public torsoBicepAngleMin: number,
        public bicepForearmAngleMax: number,
        public bicepForearmAngleMin: number,
    ){}
}

let overallHeight: number;
//const shankLengthMultiplier = new multiplierForMediaPipe(1.18, 1.045, 1.047, 1.089, 1.1)
const thighLengthMultiplier = new multiplierForMediaPipe(1.18, 1.045, 1.047, 1.089, 1.1)
//const inseamLengthMultiplier = new multiplierForMediaPipe(0.9, 0.98, 0.93, 0.92, 0.9)
const inseamLengthMultiplier = new multiplierForMediaPipe(0.9, 0.98, 1, 0.92, 0.9)
const shoulderToHipMultiplier = new multiplierForMediaPipe(0.97, 0.96, 1.083, 0.8, 0.78)
const shoulderHeightMultiplier = new multiplierForMediaPipe(1.12, 1.15, 1.088, 1.088, 1.08)
const leftElbowToLeftWristMultiplier = new multiplierForMediaPipe(0.78, 0.69, 1, 0.6, 0.58)
const leftElbowToLeftShoulderMultiplier = new multiplierForMediaPipe(0.77, 0.6, 1, 0.62, 0.58)
/*const leftElbowToLeftWristMultiplier = new multiplierForMediaPipe(0.78, 0.69, 0.72, 0.6, 0.58)
const leftElbowToLeftShoulderMultiplier = new multiplierForMediaPipe(0.77, 0.6, 0.68, 0.62, 0.58)*/
/*const leftElbowToLeftWristMultiplier = new multiplierForMediaPipe(1, 1, 1, 1, 1)
const leftElbowToLeftShoulderMultiplier = new multiplierForMediaPipe(1, 1, 1, 1, 1)*/
//const armLengthMultiplier = new multiplierForMediaPipe(1.015, 0.96, 0.95, 0.95, 0.95)
const armLengthMultiplier = new multiplierForMediaPipe(1.015, 0.96, 1, 0.95, 0.95)

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

    let armLengthTemp = leftElbowToLeftShoulder + leftElbowToLeftWrist
    armLengthTemp = armLengthMultiplier.correctValue(overallHeight, armLengthTemp);
    

    const leftFootLength = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL]);
    const rightFootLength = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL]);
    const footLengthTemp = footLength(leftFootLength, rightFootLength)

    return new BodyParamsFromMediapipe(shoulderHeightTemp, footLengthTemp, armLengthTemp, shankLengthTemp, thighLengthTemp, inseamLengthTemp);
}

export function getBodyParamsFromMediapipeResults(results: Results): BodyParamsFromMediapipe {

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

    const shoulderHeightTemp = shoulderHeight(left_shoulder_to_hip,
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

function shoulderHeight(left_shoulder_to_hip: number,
    right_shoulder_to_hip: number,
    left_hip_to_knee: number,
    right_hip_to_knee: number,
    left_knee_to_ankle: number,
    right_knee_to_ankle: number,
    left_ankle_to_foot_index: number,
    right_ankle_to_foot_index: number): number {

    const left_height = left_shoulder_to_hip + left_hip_to_knee + left_knee_to_ankle + left_ankle_to_foot_index;
    const right_height = right_shoulder_to_hip + right_hip_to_knee + right_knee_to_ankle + right_ankle_to_foot_index;
    return (left_height + right_height) / 2;
    }



    

function footLength(leftFootLength: number, rightFootLength: number): number {

    return (leftFootLength + rightFootLength) / 2;
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

// getBodyParamsFromMediapipeResults
export function getBodyAnglesFromMediapipeResults(results: Results, side: string): BodyAnglesFromMediapipe{

    let footFloorAngle = 0
    let thighShankAngle = 0
    let torsoFloorAngle = 0 
    let torsoBicepAngle = 0
    let bicepForearmAngle = 0

    let fakeHorizon: NormalizedLandmark //NormalisedLAndmark is normalised to a [0 1] scale.
    const crankAngle = 0

    //its not "turn right" but "make your right side visible to the camera". Same with left.
    if (side == "right"){ //WIP, should work
        fakeHorizon = {...results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX]};
        fakeHorizon.x -= 0.05;
        footFloorAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX],
                                                fakeHorizon,
                                                results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HEEL]); 

        fakeHorizon = {...results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP]};
        fakeHorizon.x += 0.05
        torsoFloorAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP],
                                                results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
                                                fakeHorizon) 

        thighShankAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE],
                                                results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE],
                                                results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP]
                                                )

        torsoBicepAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
                                                results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
                                                results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP])

        bicepForearmAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
                                                  results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
                                                  results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_WRIST])
    }
    else if (side == "left"){ //good for sure
        fakeHorizon = {...results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX]};
        fakeHorizon.x += 0.05
        footFloorAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HEEL],
                                                fakeHorizon);

        fakeHorizon = {...results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]};
        fakeHorizon.x -= 0.05; 
        torsoFloorAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP], 
                                                fakeHorizon,
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER]
                                                );

        thighShankAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE])
    
        torsoBicepAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW])
    
        bicepForearmAngle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_WRIST],
                                                results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER])
    }

    return new BodyAnglesFromMediapipe(footFloorAngle,
                                        thighShankAngle,
                                        torsoFloorAngle,
                                        torsoBicepAngle,
                                        bicepForearmAngle,
                                        crankAngle)

}

export function getMaxMinEveryAngle(measurements: BodyAnglesFromMediapipe[]){
    let current = measurements[0]
    let footFloorAngleMax = current.footFloorAngle
    let footFloorAngleMin = current.footFloorAngle
    let thighShankAngleMax = current.thighShankAngle
    let thighShankAngleMin = current.thighShankAngle
    let torsoFloorAngleMax = current.torsoFloorAngle
    let torsoFloorAngleMin = current.torsoFloorAngle
    let torsoBicepAngleMax = current.torsoBicepAngle
    let torsoBicepAngleMin = current.torsoBicepAngle
    let bicepForearmAngleMax = current.bicepForearmAngle
    let bicepForearmAngleMin = current.bicepForearmAngle

    for (let i=1; i<measurements.length; ++i){
        current = measurements[i];
        if (current.footFloorAngle < footFloorAngleMin) footFloorAngleMin = current.footFloorAngle
        if (current.footFloorAngle > footFloorAngleMax) footFloorAngleMax = current.footFloorAngle

        if (current.thighShankAngle < thighShankAngleMin) thighShankAngleMin = current.thighShankAngle
        if (current.thighShankAngle > thighShankAngleMax) thighShankAngleMax = current.thighShankAngle

        if (current.torsoFloorAngle < torsoFloorAngleMin) torsoFloorAngleMin = current.torsoFloorAngle
        if (current.torsoFloorAngle > torsoFloorAngleMax) torsoFloorAngleMax = current.torsoFloorAngle

        if (current.torsoBicepAngle < torsoBicepAngleMin) torsoBicepAngleMin = current.torsoBicepAngle
        if (current.torsoBicepAngle > torsoBicepAngleMax) torsoBicepAngleMax = current.torsoBicepAngle
        
        if (current.bicepForearmAngle < bicepForearmAngleMin) bicepForearmAngleMin = current.bicepForearmAngle
        if (current.bicepForearmAngle > bicepForearmAngleMax) bicepForearmAngleMax = current.bicepForearmAngle
    }

    return new BodyAnglesMaxMin(footFloorAngleMax,
         footFloorAngleMin,
          thighShankAngleMax,
           thighShankAngleMin,
            torsoFloorAngleMax,
             torsoFloorAngleMin,
              torsoBicepAngleMax,
               torsoBicepAngleMin,
                bicepForearmAngleMax,
                 bicepForearmAngleMin)
}