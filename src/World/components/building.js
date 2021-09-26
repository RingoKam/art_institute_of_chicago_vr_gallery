import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/examples/js/libs/draco/');
// loader.setDRACOLoader(dracoLoader);

export const createBuilding = () => {
    // Load a glTF resource
    return new Promise((resolve, reject) => {
        loader.load(
            // resource URL
            'building.glb',
            // called when the resource is loaded
            function (gltf) {
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                resolve(gltf)
            },
            // called while loading is progressing
            function (xhr) {
                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                reject(error)
            }
        );
    })
}

