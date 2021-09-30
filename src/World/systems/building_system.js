import { Vector3 } from 'three'
import { createBuilding } from '../components/building'
import { createArtworkList } from "../components/artwork-list"
import { createLogo } from '../components/logo'
import TWEEN from '@tweenjs/tween.js/dist/tween.esm.js';

const distance = 50

export class BuildingSystem {

    constructor(viewer, scene, camera) {
        this.viewer = viewer
        this.camera = camera
        this.scene = scene
        this.page = 0;
        this.buildingArrays = []
        this.distance = -50

        this.building = null
        this.addBuilding(-20);
    }

    tick() {
        // console.log(this.camera.position)
        if (this.viewer?.position.z < this.distance || this.camera?.position < this.distance) {
            this.page++
            this.distance -= distance
            // add another building
            this.addBuilding(this.distance)
        }
    }

    addBuilding(zPosition) {
        //add wall
        //add trees
        (
            this.building === null 
            ? createBuilding().then((scene) => { this.building = scene.clone(); return scene; })
            : Promise.resolve(this.building.clone())
        )
            .then(
                (scene) => {
                    //add list
                    const list = createArtworkList(this.page)
                    scene.add(list);

                    //kigi
                    const logo = createLogo()
                    scene.add(logo)

                    logo.position.set(0, 1.5, 0.5)
                    scene.scale.set(5, 5, 5)
                    this.scene.add(scene)

                    scene.position.set(0, -10, zPosition)
                    new TWEEN.Tween(scene.position)
                        .to({ y: 0 })
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start()
                }
            )
    }
}