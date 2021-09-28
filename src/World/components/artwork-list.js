import { Vector3, Group } from "three";
import { watch, effectScope } from "vue";
import { useArtwork } from "../../api/artwork";
import { emitter, createDestroyEvent } from "../emitter"
import { createArtworkListItem } from './artwork-list-item'
// import { createMangaListItem } from "./manga-list-item"

const positions = [
    [new Vector3(-1.75, 0.70, -0.65), {x: 0, y: Math.PI, z: 0}],
    [new Vector3(1.750, 0.70, -0.65), {x: 0, y: Math.PI, z: 0}],
    [new Vector3(-1.75, 0.70, -5.40), {x: 0, y: 0, z: 0}],
    [new Vector3(1.750, 0.70, -5.40), {x: 0, y: 0, z: 0}],

    [new Vector3(3.400, 0.70, -2.00), {x: 0, y: -Math.PI /2, z: 0}],
    [new Vector3(3.400, 0.70, -3.10), {x: 0, y: -Math.PI /2, z: 0}],
    [new Vector3(3.400, 0.70, -4.20), {x: 0, y: -Math.PI /2, z: 0}],
    [new Vector3(-3.40, 0.70, -2.00), {x: 0, y: Math.PI /2, z: 0}],
    [new Vector3(-3.40, 0.70, -3.10), {x: 0, y: Math.PI /2, z: 0}],
    [new Vector3(-3.40, 0.70, -4.20), {x: 0, y: Math.PI /2, z: 0}],

    // [new Vector3(3.400, 0.70, -4.20), {x: 0, y: -Math.PI /2, z: 0}],
    // [new Vector3(-3.40, 0.70, -2.00), {x: 0, y: Math.PI /2, z: 0}],

    [new Vector3(-1.5, 0.70, -2.4), {x: 0, y: 0, z: 0}],
    [new Vector3(1.5, 0.70, -3.4), {x: 0, y: 0, z: 0}],
]

export const createArtworkList = (page_number) => {
    let scope = effectScope();
    let artWorkListGroup = new Group();
    const destroyEvent = createDestroyEvent(page_number);
    
    const { fetchArtwork, artwork } = useArtwork();
    fetchArtwork(page_number);

    scope.run(() => {
        watch(artwork, (val) => {
            //clear out the children
            artWorkListGroup.children.forEach((child) => child.remove());

            val.map((v, i) => {
                if(!v.image_id) return
                let item = createArtworkListItem({
                    coverUrl: v.image_id,
                    title: v.title,
                    id: v.id,
                })
                const posData = positions[i]
                if(!posData) return 
                item.position.set(posData[0].x, posData[0].y, posData[0].z)
                item.rotation.set(posData[1].x, posData[1].y, posData[1].z) 
                artWorkListGroup.add(item)
            });
        });
    });

    emitter.on(destroyEvent, () => {
        scope.stop()
        artWorkListGroup.remove()
        emitter.off(destroyEvent1)
    })

    return artWorkListGroup
}