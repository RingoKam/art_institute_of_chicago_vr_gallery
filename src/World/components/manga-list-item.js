import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import { generateImageUrl } from "../../transport/image";

export const createMangaListItem = ({ id, coverUrl, title }) => {
    let loader = new THREE.TextureLoader();
   
    let container = new ThreeMeshUI.Block({
        height: 1.5,
        width: 1,
    });
    let material = new THREE.MeshBasicMaterial({
        color: "red",
        wireframe: true,
    });
    let geometry = new THREE.PlaneGeometry(1, 1.5);
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
