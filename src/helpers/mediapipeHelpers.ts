import { NormalizedLandmark, POSE_LANDMARKS, POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT } from "@mediapipe/pose";

export function areAllBodyPointsVisible(landmarks: NormalizedLandmark[]) {    
    const visibilityThreshold = 0.5;

    for (let i = 0; i < landmarks.length; i++) {
        const visibility = landmarks[i].visibility ?? 0;
        if (visibility < visibilityThreshold)
            return false;
    }

    return true;
}

//The purpose of those two functions is to provide an DRY way to get all body point indexes that should be drawn
//during the whole angle-measuring procedure.
export function getAllRelevantRightBodyPointIndexes() : number[]{
    const joints_readable = [
        POSE_LANDMARKS_RIGHT.RIGHT_WRIST,
        POSE_LANDMARKS_RIGHT.RIGHT_ELBOW,
        POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER,
        POSE_LANDMARKS_RIGHT.RIGHT_HIP,
        POSE_LANDMARKS_RIGHT.RIGHT_KNEE,
        POSE_LANDMARKS_RIGHT.RIGHT_ANKLE,
        POSE_LANDMARKS_RIGHT.RIGHT_FOOT_INDEX,
        POSE_LANDMARKS_RIGHT.RIGHT_HEEL]

    return joints_readable;
}
export function getAllRelevantLeftBodyPointIndexes(): number[]{
    const joints_readable = [
        POSE_LANDMARKS_LEFT.LEFT_WRIST,
        POSE_LANDMARKS_LEFT.LEFT_ELBOW,
        POSE_LANDMARKS_LEFT.LEFT_SHOULDER,
        POSE_LANDMARKS_LEFT.LEFT_HIP,
        POSE_LANDMARKS_LEFT.LEFT_KNEE,
        POSE_LANDMARKS_LEFT.LEFT_ANKLE,
        POSE_LANDMARKS_LEFT.LEFT_HEEL,
        POSE_LANDMARKS_LEFT.LEFT_FOOT_INDEX];

    return joints_readable;
}

export function getAllLeftFingerPointIndexes(): number[]{
    const joints_readable = [
        POSE_LANDMARKS_LEFT.LEFT_THUMB,
        POSE_LANDMARKS_LEFT.LEFT_INDEX,
        POSE_LANDMARKS_LEFT.LEFT_PINKY
    ]
    return joints_readable;
}
export function getAllRightFingerPointIndexes(): number[]{
    const joints_readable = [
        POSE_LANDMARKS_RIGHT.RIGHT_THUMB,
        POSE_LANDMARKS_RIGHT.RIGHT_INDEX,
        POSE_LANDMARKS_RIGHT.RIGHT_PINKY
    ]
    return joints_readable;
}

export function getAllFacePointIndexes(): number[]{
    // all face-points have indexes between 0 and 10
    const joints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return joints;
}

export function areAllSideBodyPointsVisible(landmarks: NormalizedLandmark[], side: string){
    const visibilityThreshold = 0.5;
    let joints_readable: number[] = [];

    switch (side) {
        case 'right': {
            joints_readable = getAllRelevantRightBodyPointIndexes();
            break;
        }
        case 'left': {
            joints_readable = getAllRelevantLeftBodyPointIndexes();
            break;
        }
        default :{
            console.log(`Unknown 'side' parameter: ${side}`);
            throw new Error(`Unknown 'side' parameter: ${side}`);
        }
    }

    for (let j = 0; j < joints_readable.length; ++j){
        const visibility = landmarks[joints_readable[j]].visibility ?? 0;
        if (visibility < visibilityThreshold)
            return false;
    }
    return true;
}