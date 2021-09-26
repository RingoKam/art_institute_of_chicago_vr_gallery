import * as THREE from "three";
import { watch, effectScope } from "vue";
import { useArtwork } from "../../api/artwork";
import { createMangaListItem } from "./manga-list-item"
export class MangaList {
    constructor() {
        this.scope = effectScope();

        this.mangaListGroup = new THREE.Group();
        const { fetchArtwork, artwork } = useArtwork();

        this.scope.run(() => {
            watch(artwork, (val) => {
                //clear out the children
                this.mangaListGroup.children.forEach((child) => child.remove());

                //add
                let row = 1.5;
                let col = -2.5;
                val.map((v, i) => {
                    if (i != 0 && i % 3 === 0) {
                        row -= 1.5;
                        col = -2.5;
                    }
                    let item = createMangaListItem({
                        coverUrl: v.image_id,
                        title: v.title,
                        id: v.id,
                    })
                    item.position.x = col
                    item.position.y = row
                    this.mangaListGroup.add(item)
                });
            });
        });

        fetchArtwork();
    }

    //class destructor
    destroy() {
        this.scope.stop();
        this.mangaListGroup.remove();
    }
}
