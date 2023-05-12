import { NormalizedLandmark } from "@mediapipe/pose";

export function areAllBodyPointsVisible(landmarks: NormalizedLandmark[]) {    
    const visibilityThreshold = 0;

    for (let i = 0; i < landmarks.length; i++) {
        const visibility = landmarks[i].visibility ?? 0;
        if (visibility < visibilityThreshold)
            return false;
    }

    return true;
}