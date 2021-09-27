import { ref } from 'vue'
import { getArtWorkList } from '../transport/artwork'

export const useArtwork = () => {

    let artwork = ref([]);
    let page = ref(0);
    let limit = ref(13);

    const fetchArtwork = (fields = "id,artist_display,title,image_id") => {
        return getArtWorkList({
            limit: limit.value, 
            page: page.value,
            fields
        }).then(({ data }) => {
            artwork.value = data.data;
        })
    }

    const nextPage = () => {
        //limit offset cannot be max length
        page.value ++;
        return fetchManga();
    };

    const prevPage = () => {
        //limit offset cannot be 0
        page.value --;
        return fetchManga();
    };

    return {
        artwork,
        fetchArtwork,
        nextPage,
        prevPage
    }
}