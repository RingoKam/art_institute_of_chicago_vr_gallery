import * as THREE from "three";
import { Vector3 } from "three";
import { watch, effectScope } from "vue";
import { useArtwork } from "../../api/artwork";
import { createMangaListItem } from "./manga-list-item"

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

export class MangaList {
    constructor() {
        this.scope = effectScope();

        this.mangaListGroup = new THREE.Group();
        const { fetchArtwork, artwork } = useArtwork();

        this.scope.run(() => {
            watch(artwork, (val) => {
                //clear out the children
                this.mangaListGroup.children.forEach((child) => child.remove());

                val.map((v, i) => {
                    let item = createMangaListItem({
                        coverUrl: v.image_id,
                        title: v.title,
                        id: v.id,
                    })
                    const posData = positions[i]
                    if(!posData) return 
                    item.position.set(posData[0].x, posData[0].y, posData[0].z)
                    item.rotation.set(posData[1].x, posData[1].y, posData[1].z) 
                    console.log(item.position)
                    this.mangaListGroup.add(item)
                });
            });
        });

        fetchArtwork();
    }

    log() {
        this.mangaListGroup.children.forEach(obj => {
            console.log(obj.position)
        })
    }

    //class destructor
    destroy() {
        this.scope.stop();
        this.mangaListGroup.remove();
    }
}
