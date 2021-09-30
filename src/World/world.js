import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { Group } from "three"
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
// import { createLights } from './components/lights.js';
import { createMeshGroup } from './components/mesh-group.js';
import { createVRHands } from './components/vr-hands.js'
import { createFloor } from './components/floor'

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';
import { BuildingSystem } from './systems/building_system'
import { Gamepad } from "./systems/gamepad"
import { Locomotion } from './systems/locomotion'
import { loadFont } from './load-font'

class World {

  constructor(container) {
    //load three roboto font
    loadFont()
    
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();
    this.viewer = new Group(); 

    this.scene.add(this.viewer)
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    //add VR hands
    this.viewer.add(this.camera);
    
    const hands = createVRHands(this.renderer)
    Object.values(hands).forEach(h => this.viewer.add(h))
    
    container.append(this.renderer.domElement);

    //add floor
    const floor = createFloor()
    floor.position.set(0, 0, 0)
    this.scene.add(floor)
    this.camera.getWorldPosition()

    this.loop.updatables.push(new BuildingSystem(this.viewer, this.scene, this.camera)) 
    this.loop.updatables.push(new Gamepad(this.renderer))

    const locomotion = new Locomotion(this.viewer, this.camera, this.scene, this.renderer, hands.controller1, hands.controller2)
    this.loop.updatables.push(locomotion)

    this.controls = createControls(this.camera, this.renderer.domElement);
    this.loop.updatables.push(this.controls)

    let vrButton = VRButton.createButton(this.renderer)
    container.appendChild(vrButton);

    this.resizer = new Resizer(container, this.camera, this.renderer);
  }
  
  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
