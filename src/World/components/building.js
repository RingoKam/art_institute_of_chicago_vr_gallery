import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshBasicMaterial, Vector3, Group } from 'three'

const loader = new GLTFLoader();

let whiteMaterial = new MeshBasicMaterial({ color: 0xFFFFFF });
let greenMaterial = new MeshBasicMaterial({ color: 'green' });

/**
 * Load my 3D building models
 * @returns Group
 */
export const createBuilding = () => {
    return Promise.all([loader.loadAsync('building.glb').then(gltf => {
        gltf.scene.traverse((o) => {
            if (o.isMesh) o.material = whiteMaterial;
        });
        return gltf
    }),
    loader.loadAsync('treeline.glb').then(gltf => {
        gltf.scene.traverse((o) => {
            if (o.isMesh) o.material = greenMaterial;
        });
        return gltf
    })]).then(([building, tree]) => {
        const buildings = new Group()
        buildings.add(building.scene)
        buildings.add(tree.scene)
        tree.scene.position.z = 0.2
        return buildings
    })
}

