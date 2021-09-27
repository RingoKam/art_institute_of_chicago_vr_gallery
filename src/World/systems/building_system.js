import { Vector3 } from 'three'
import { createBuilding } from '../components/building'

const distance = 50

export class BuildingSystem {

    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene

        this.buildingArrays = []
        this.distance = -50

        this.addBuilding(0);
    }

    tick() {
        // console.log(this.camera.position)
        if (this.camera.position.z < this.distance) {
            console.log("yes")
            this.distance -= distance
            // add another building
            this.addBuilding(this.distance)
        }
    }

    addBuilding(zPosition) {
        //add wall
        //add trees
        createBuilding().then(
            (gltf) => {
                // gltf.scene.add(manga.mangaListGroup)
                gltf.scene.scale.set(5, 5, 5)
                this.scene.add(gltf.scene)
                gltf.scene.position.set(0, 0, zPosition) 
            }
        )
    }
}