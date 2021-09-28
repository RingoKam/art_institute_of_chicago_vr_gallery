import {
    Mesh,
    MeshBasicMaterial,
    SphereBufferGeometry,
    BackSide
} from 'three';

/**
 * Create a blinker sphere for to block out everything aside from the camera 
 * @returns Mesh
 */
export const createBlinkerSphere = () => {
    const blinkerSphereGeometry = new SphereBufferGeometry(0.3, 16, 16);
    blinkerSphereGeometry.translate(0, 0.3, 0);
    const blinkerSphereMaterial = new MeshBasicMaterial({
        side: BackSide,
        color: 0x000000,
        transparent: true
    });
    const blinkerSphere = new Mesh(blinkerSphereGeometry, blinkerSphereMaterial);
    blinkerSphere.rotation.set(Math.PI / 2, 0, 0);
    blinkerSphere.position.set(0, 0, -0.3);
    blinkerSphere.visible = false;

    return blinkerSphere
}