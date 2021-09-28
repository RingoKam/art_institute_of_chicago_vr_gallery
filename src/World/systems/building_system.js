import { Vector3 } from 'three'
import { createBuilding } from '../components/building'
import { createArtworkList } from "../components/artwork-list"
const distance = 50

export class BuildingSystem {

    constructor(viewer, scene, camera) {
        this.viewer = viewer
        this.camera = camera
        this.scene = scene
        this.page = 0;
        this.buildingArrays = []
        this.distance = -50

        this.addBuilding(0);
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
        createBuilding().then(
            (gltf) => {
                //add list
                const list = createArtworkList(this.page)
                gltf.scene.add(list);

                gltf.scene.scale.set(5, 5, 5)
                this.scene.add(gltf.scene)
                gltf.scene.position.set(0, 0, zPosition) 
            }
        )
    }
}