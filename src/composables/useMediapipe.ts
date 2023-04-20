import { Pose } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Results, Options } from '@mediapipe/pose';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
/**
 * return configured pose - vue composition api
 */
export default function useMediapipePose() {
    const pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });
    const options: Options = {
        selfieMode: true,
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    };
    pose.setOptions(options);

    const drawResults = (results: Results, canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                results.image,
                0, 0, canvas.width, canvas.height
            );
            drawConnectors(
                ctx, results.poseLandmarks, POSE_CONNECTIONS,
                { color: '#00FF00', lineWidth: 4 }
            );
            drawLandmarks(
                ctx, results.poseLandmarks,
                { color: '#FF0000', lineWidth: 2 }
            );
        }
    };

    return {
        pose,
        drawResults
    }
}