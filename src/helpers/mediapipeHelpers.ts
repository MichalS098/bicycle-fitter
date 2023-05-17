import { NormalizedLandmark } from "@mediapipe/pose";

export function areAllBodyPointsVisible(landmarks: NormalizedLandmark[]) {    
    const visibilityThreshold = 0.5;

    for (let i = 0; i < landmarks.length; i++) {
        const visibility = landmarks[i].visibility ?? 0;
        if (visibility < visibilityThreshold)
            return false;
    }

    return true;
}

export function areAllLeftBodyPointsVisible(landmarks: NormalizedLandmark[]){
    const visibilityThreshold = 0.5;

    const joints = [15, 13, 11, 23, 25, 27, 29, 31]

    for (let j = 0; j < joints.length; ++j){
        const visibility = landmarks[joints[j]].visibility ?? 0;
        if (visibility < visibilityThreshold)
            return false;
    }
    return true;
}

export function areAllRightBodyPointsVisible(landmarks: NormalizedLandmark[]){
    const visibilityThreshold = 0.5;

    const joints = [16, 14, 12, 24, 26, 28, 32, 30]

    for (let j = 0; j < joints.length; ++j){
        const visibility = landmarks[joints[j]].visibility ?? 0;
        if (visibility < visibilityThreshold)
            return false;
    }
    return true;
}