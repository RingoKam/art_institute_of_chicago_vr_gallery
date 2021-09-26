import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
// import { createLights } from './components/lights.js';
import { createMeshGroup } from './components/mesh-group.js';
import { createVRHands } from './components/vr-hands.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';
import { MangaList } from './components/manga-list'
import { DirectionalLight } from 'three'
import { createBuilding } from './components/building'

class World {
  constructor(container) {
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();
    
    //add VR hands
    const hands = createVRHands(this.renderer)
    hands.forEach(h => this.scene.add(h))

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);

    // const mainLight = new DirectionalLight('white', 5);
    // mainLight.position.set(10, 10, -10);

    const controls = createControls(this.camera, this.renderer.domElement);
    // const { ambientLight , mainLight } = createLights();
    const meshGroup = createMeshGroup();

    meshGroup.position.z = -10
    this.loop.updatables.push(controls, meshGroup);
    this.scene.add(meshGroup);

    createBuilding().then(gltf => {
      this.scene.add(gltf.scene)
    })

    const manga = new MangaList();
    this.scene.add(manga.mangaListGroup);

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
