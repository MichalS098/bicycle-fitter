import { Pose } from '@mediapipe/pose';
import { DrawingOptions, drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Results, Options } from '@mediapipe/pose';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import {getAllRelevantRightBodyPointIndexes,
        getAllRelevantLeftBodyPointIndexes, 
        getAllRightFingerPointIndexes, 
        getAllLeftFingerPointIndexes,
        getAllFacePointIndexes} from '@/helpers/mediapipeHelpers'

export default function useMediapipePose() {
    const pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });
    const options: Options = {
        selfieMode: false, //------------------
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
    };
    pose.setOptions(options);

    /**
     * Draw landmarks and their connections
     * @param results Posible results from Pose
     * @param canvas HTMLCanvasElement. Provides properties and methods for manipulating the layout and presentation of elements
     * @param side side of the body which sould be excluded from rendering: 'right'/'left'/'none'
     */
    const drawResults = (results: Results, canvas: HTMLCanvasElement, side: string) => {
        const ctx = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const scaleFactor = canvasWidth / results.image.width;
        canvas.width = results.image.width * scaleFactor;
        canvas.height = results.image.height * scaleFactor;

        const landmarksToExclude = excludeLandmarks(side);
        let i: number;
        for (i of landmarksToExclude){
            const x = results?.poseLandmarks?.at(i)
            if (x !== undefined){
                results.poseLandmarks[i].visibility = 0;
                results.poseLandmarks[i].visibility = 0;
            }
        }

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
                { color: '#E48C56', lineWidth: 1 }
            );
            drawLandmarks(
                ctx, results.poseLandmarks,
                { color: '#E48C56', radius: 1 }
            );
        }
    };

    return {
        pose,
        drawResults
    }
}

function excludeLandmarks(side: string){
    let landmarksToExclude: number[] = []
    switch (side){
        case 'left': { //if left side is visible, exclude right side from drawing.
            landmarksToExclude = landmarksToExclude.concat(
                getAllRightFingerPointIndexes(),
                getAllRelevantRightBodyPointIndexes(),
                getAllFacePointIndexes());
            break;
        }
        case 'right': { //and vice versa
            landmarksToExclude = landmarksToExclude.concat(
                getAllRelevantLeftBodyPointIndexes(),
                getAllLeftFingerPointIndexes(),
                getAllFacePointIndexes());
            break;
        }
        case 'none': {
            break;
        }
        default: {
            console.log(`Unknown 'side' parameter: ${side}`);
            throw new Error(`Unknown 'side' parameter: ${side}`);
        }
    }
    return landmarksToExclude;
}
