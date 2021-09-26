import * as THREE from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

export const createVRHands = (renderer) => {

    let controller1 = renderer.xr.getController(0);
    controller1.addEventListener("selectstart", () => {});
    controller1.addEventListener("selectend", () => {});
    // scene.add(controller1);

    let controller2 = renderer.xr.getController(1);
    controller2.addEventListener("selectstart", () => {});
    controller2.addEventListener("selectend", () => {});
    // scene.add(controller2);

    const controllerModelFactory = new XRControllerModelFactory();
    let controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(
        controllerModelFactory.createControllerModel(controllerGrip1)
    );
    // scene.add(controllerGrip1);

    let controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(
        controllerModelFactory.createControllerModel(controllerGrip2)
    );
    // scene.add(controllerGrip2);

    const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

    const line = new THREE.Line( geometry );
    line.name = 'line';
    line.scale.z = 5;

    controller1.add( line.clone() );
    controller2.add( line.clone() );

    return [controller1, controller2, controllerGrip1, controllerGrip2]
};
