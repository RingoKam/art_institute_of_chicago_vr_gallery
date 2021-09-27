import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
// import { createLights } from './components/lights.js';
import { createMeshGroup } from './components/mesh-group.js';
import { createVRHands } from './components/vr-hands.js'
import { createFloor } from './components/floor'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';
import { BuildingSystem } from './systems/building_system'
import { MangaList } from './components/manga-list'
import { createBuilding } from './components/building'

class World {

  constructor(container) {
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();

    this.loop = new Loop(this.camera, this.scene, this.renderer);

    //add VR hands
    const hands = createVRHands(this.renderer)
    hands.forEach(h => this.scene.add(h))
    container.append(this.renderer.domElement);

    //add floor
    const floor = createFloor()
    floor.position.set(0, 0, 0)
    this.scene.add(floor)

    this.loop.updatables.push(new BuildingSystem(this.camera, this.scene)) 
    // createBuilding().then(gltf => {
    //   const manga = new MangaList();
    //   gltf.scene.add(manga.mangaListGroup)
    //   gltf.scene.scale.set(5,5,5)
    //   this.scene.add(gltf.scene)
    // })

    // const mainLight = new DirectionalLight('white', 5);
    // mainLight.position.set(10, 10, -10);

    this.controls = createControls(this.camera, this.renderer.domElement);
    this.loop.updatables.push(this.controls)

    // const { ambientLight , mainLight } = createLights();
    // const meshGroup = createMeshGroup();
    // meshGroup.position.z = -10
    // this.scene.add(meshGroup);
    // this.loop.updatables.push(controls, meshGroup);


    let vrButton = VRButton.createButton(this.renderer)
    container.appendChild(vrButton);

    this.resizer = new Resizer(container, this.camera, this.renderer);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
