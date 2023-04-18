<template>
    <div class="pose-container">
      <video ref="video" autoplay playsinline muted></video>
      <canvas ref="canvas"></canvas>
    </div>
</template>
  

<script>

    import { ref, onMounted } from "vue";
    import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
    //   import { load as loadPose, Pose, POSE_CONNECTIONS } from "@mediapipe/pose";

    import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
    
    export default {
        setup() {
        const video = ref(null);
        const canvas = ref(null);
    
        onMounted(async () => {
            await setupCamera();
            setupMediaPipe();
        });
    
        async function setupCamera() {
            try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });
            video.value.srcObject = stream;
            console.log(stream)
    
            return new Promise((resolve) => {
                video.value.onloadedmetadata = () => {
                    resolve(video.value.play());
                };
            });
            } catch (err) {
                console.error(err);
            }
        }
    
        function setupMediaPipe() {
            const pose = new Pose({
                locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.163/${file}`;
                },
            });


            pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            });
    
            pose.onResults(onResults);
    
            const ctx = canvas.value.getContext("2d");
    
            function onResults(results) {
            canvas.value.width = video.value.videoWidth;
            canvas.value.height = video.value.videoHeight;
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    
            drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
                color: "white",
                lineWidth: 4,
            });
    
            drawLandmarks(ctx, results.poseLandmarks, {
                color: "white",
                fillColor: "white",
                lineWidth: 2,
                radius: 4,
            });
            }
    
            const cameraListener = () => {
            pose.send({ image: video.value });
            requestAnimationFrame(cameraListener);
            };
            cameraListener();
        }
    
        return { video, canvas };
        },
    };
</script>
    
<style scoped>
    .pose-container {
        position: relative;
    }
    
    canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
    