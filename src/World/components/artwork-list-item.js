import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import { generateImageUrl } from "../../transport/image";

const height = 1 / 2
const width = 1.5 / 2

export const createArtworkListItem = ({ id, coverUrl, title }) => {
    let loader = new THREE.TextureLoader();
    let imageContainer = new ThreeMeshUI.Block({
        height,
        width,
        backgroundSize: "contain"
    });
    let material = new THREE.MeshBasicMaterial({
        color: "red",
        // wireframe: true,
    });

    material.transparent = true
    material.opacity = 0

    let geometry = new THREE.PlaneGeometry(width, height);
    let listItem = new THREE.Mesh(geometry, material);
    listItem.add(imageContainer)
    const url = generateImageUrl(coverUrl);
    loader.load(
        url,
        (texture) => {
            //on load
            imageContainer.set({ backgroundTexture: texture });
            ThreeMeshUI.update();
        },
        () => {
            //loading...
        },
        (er) => {
            //success
            imageContainer.add(new ThreeMeshUI.Text({ content: title }));
            ThreeMeshUI.update();
        }
    );
    let textContainer = new ThreeMeshUI.Block({
        width: width,
        height: 0.1,
        padding: 0.05,
        justifyContent: 'center',
        alignContent: 'left',
        fontFamily: 'Roboto',
        fontTexture: 'Roboto'
    });
    textContainer.add(new ThreeMeshUI.Text({ content: title }));
    textContainer.position.set(0, -0.35, 0.01)
    listItem.add(textContainer)

return listItem
};
