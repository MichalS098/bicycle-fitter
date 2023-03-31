import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

export default function useCamera() {
    const getPhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
    };

    return {
        getPhoto,
    };
}