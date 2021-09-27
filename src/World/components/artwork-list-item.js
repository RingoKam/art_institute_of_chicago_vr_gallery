import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import { generateImageUrl } from "../../transport/image";

const height = 1 / 2
const width = 1.5 / 2

export const createArtworkListItem = ({ id, coverUrl, title }) => {
    let loader = new THREE.TextureLoader();
    let container = new ThreeMeshUI.Block({
        height,
        width,
        backgroundSize: "contain"
    });
    let material = new THREE.MeshBasicMaterial({
        color: "red",
        wireframe: true,
    });
    let geometry = new THREE.PlaneGeometry(width, height);
    let listItem = new THREE.Mesh(geometry, material);
    listItem.add(container)
    const url = generateImageUrl(coverUrl);
    loader.load(
        url,
        (texture) => {
            //on load
            container.set({ backgroundTexture: texture });
            ThreeMeshUI.update();
        },
        () => {
            //loading...
        },
        (er) => {
            //success
            container.add(new ThreeMeshUI.Text({ content: title }));
            ThreeMeshUI.update();
        }
    );

    return listItem
};
