import { Pose } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Results, Options } from '@mediapipe/pose';
import { POSE_CONNECTIONS } from '@mediapipe/pose';

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
        const canvasWidth = canvas.width;
        const scaleFactor = canvasWidth / results.image.width;
        canvas.width = results.image.width * scaleFactor;
        canvas.height = results.image.height * scaleFactor;

        if (ctx) {
            ctx.save();
            // clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // mirror image
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);

            // draw image
            ctx.drawImage(
                results.image,
                0, 0, canvas.width, canvas.height
            );
            drawConnectors(
                ctx, results.poseLandmarks, POSE_CONNECTIONS,
                { color: '#E48C56', lineWidth: 2 }
            );
            drawLandmarks(
                ctx, results.poseLandmarks,
                { color: '#E48C56', radius: 3 }
            );
        }
    };

    return {
        pose,
        drawResults
    }
}