import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshBasicMaterial, Vector3, Group } from 'three'

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/examples/js/libs/draco/');
// loader.setDRACOLoader(dracoLoader);
let whiteMaterial = new MeshBasicMaterial({ color: 0xFFFFFF });
let greenMaterial = new MeshBasicMaterial({ color: 'green' });


export const createBuilding = () => {
    // Load a glTF resource
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

    // return new Promise((resolve, reject) => {
    //     loader.load(
    //         // resource URL
    //         'building.glb',
    //         // called when the resource is loaded
    //         function (gltf) {
    //             gltf.animations; // Array<THREE.AnimationClip>
    //             gltf.scene; // THREE.Group
    //             gltf.scenes; // Array<THREE.Group>
    //             gltf.cameras; // Array<THREE.Camera>
    //             gltf.asset; // Object
    //             var newMaterial = new MeshBasicMaterial({color: 0xFFFFFF});
    //             gltf.scene.traverse((o) => {
    //                 if (o.isMesh) o.material = newMaterial;
    //               });
    //             resolve(gltf)
    //         },
    //         // called while loading is progressing
    //         function (xhr) {
    //             // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //         },
    //         // called when loading has errors
    //         function (error) {
    //             reject(error)
    //         }
    //     );
    // })
}

