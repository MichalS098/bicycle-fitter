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

function getDistanceBetweenPoints2D(point1: NormalizedLandmark, point2: NormalizedLandmark): number {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return distance;
}


function theHeightOfTheTriangle(firstSideOfTriangle: number, secondSideOfTriangle: number, thirdSideOfTriangle: number): number {
    const S = (firstSideOfTriangle + secondSideOfTriangle + thirdSideOfTriangle) / 2
    const A = Math.sqrt(S * (S - firstSideOfTriangle) * (S - secondSideOfTriangle) * (S - thirdSideOfTriangle))
    const H = (2 * A) / firstSideOfTriangle

    return H
}

//Returns angle at point1
//TODO add a check to see if any pair is essentially the same point.

// function getAngleBetweenPoints(point1: NormalizedLandmark, point2: NormalizedLandmark, point3: NormalizedLandmark) {
//     const p12 = getDistanceBetweenPoints(point1, point2); //p12
//     const p23 = getDistanceBetweenPoints(point2, point3); //p23
//     const p31 = getDistanceBetweenPoints(point3, point1); //p31

//     const angle = Math.acos((Math.pow(p12, 2) + Math.pow(p31, 2) - Math.pow(p23, 2)) / (2 * p23 * p31));

//     if (Number.isNaN(angle)) return 0;

//     return angle * (180.0 / 3.14159);
// }

// function getAngleBetweenPoints(point1: NormalizedLandmark, point2: NormalizedLandmark, point3: NormalizedLandmark) {
//     const numerator = point2.y*(point1.x-point3.x) + point1.y*(point3.x-point2.x) + point3.y*(point2.x-point1.x);
//     const denominator = (point2.x-point1.x)*(point1.x-point3.x) + (point2.y-point1.y)*(point1.y-point3.y);
//     const ratio = numerator/denominator;

//     let angle = (Math.atan(ratio) * 180) / Math.PI

//     if(angle<0) angle = 180+angle;

//     return angle

// }

function getAngleBetweenPoints(point1: NormalizedLandmark, point2: NormalizedLandmark, point3: NormalizedLandmark){
    const angleRad = Math.atan2(point3.y - point1.y, point3.x - point1.x) - 
                     Math.atan2(point2.y - point1.y, point2.x - point1.x); 

    let angleDeg = (angleRad * 180) / Math.PI;
    if (angleDeg < 0) angleDeg = 360 + angleDeg;
    return angleDeg
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