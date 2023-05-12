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

//Returns angle at point1
function getAngleBetweenPoints(point1: NormalizedLandmark, point2: NormalizedLandmark, point3: NormalizedLandmark) {
    const p12 = getDistanceBetweenPoints(point1, point2); //p12
    const p23 = getDistanceBetweenPoints(point2, point3); //p23
    const p31 = getDistanceBetweenPoints(point3, point1); //p31
    const angle = Math.acos((Math.pow(p12, 2) + Math.pow(p31, 2) - Math.pow(p23, 2)) / (2 * p23 * p31));

    return angle;
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

    const armLengthTemp = armLength(leftElbowToLeftShoulder + leftElbowToLeftWrist, rightElbowToRightShoulder + rightElbowToRightWrist);

    const leftAnkleToLeftKnee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE]);
    const rightAnkleToRightKnee = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE]);

    const shankLengthTemp = (leftAnkleToLeftKnee + rightAnkleToRightKnee) / 2

    const leftKneeToLeftHip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]);
    const rightKneeToRightHip = getDistanceBetweenPoints(results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE], results.poseWorldLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP]);
    const thighLengthTemp = (leftKneeToLeftHip + rightKneeToRightHip) / 2

    const inseamLengthTemp = shankLengthTemp + thighLengthTemp //narazie taki szacunek inseamLength to jeszcze do uzgodnienia 
    
    return new BodyParamsFromMediapipe(shoulderHeightTemp, footLengthTemp, armLengthTemp, shankLengthTemp, thighLengthTemp, inseamLengthTemp);
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

function armLength(leftElbowToLeftShoulder: number, rightElbowToRightShoulder: number): number {

    return (leftElbowToLeftShoulder + rightElbowToRightShoulder) / 2;
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
export function getBodyAnglesFromMediapipeResults(results: Results): BodyAnglesFromMediapipe{

    const left_foot_floor_angle = 0; //TODO
    const left_torso_floor_angle = 0;
    const crank_angle = 0;
    const left_thigh_shank_angle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE],
                                                            results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP],
                                                            results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE])

    const left_torso_bicep_angle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
                                                            results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW],
                                                            results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_HIP])

    const left_bicep_forearm_angle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW],
                                                            results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
                                                            results.poseLandmarks[POSE_LANDMARKS_LEFT.LEFT_WRIST])


    const right_foot_floor_angle = 0; //TODO
    const right_torso_floor_angle = 0;
    const right_angle = 0;
    const right_thigh_shank_angle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE],
                                                            results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP],
                                                            results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE])

    const right_torso_bicep_angle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
                                                            results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
                                                            results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP])

    const right_bicep_forearm_angle = getAngleBetweenPoints(results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
                                                            results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
                                                            results.poseLandmarks[POSE_LANDMARKS_RIGHT.RIGHT_WRIST])

                                                            
    return new BodyAnglesFromMediapipe(left_foot_floor_angle,
                                        left_thigh_shank_angle,
                                        left_torso_floor_angle,
                                        left_torso_bicep_angle,
                                        left_bicep_forearm_angle,
                                        crank_angle)

}