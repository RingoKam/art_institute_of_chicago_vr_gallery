import { ref } from "vue";
import { formatMangaList } from "./format-api";
import { getMangaList } from "../transport/manga";
import { keyBy } from "lodash";

export const useManga = () => {
    let manga = ref([]);
    let offset = ref(0);
    let limit = ref(18);

    const fetchManga = () => {
        return getMangaList({
            limit: limit.value,
            offset: offset.value,
            includes: ["cover_art"],
            contentRating: ["safe"],
        }).then(({ data }) => {
            manga.value = formatMangaList(data.data);
            return manga.value;
        });
    };

    const nextOffSet = () => {
        //limit offset cannot be max length
        offset.value += limit.value;
        return fetchManga();
    };

    const prevOffset = () => {
        //limit offset cannot be 0
        offset.value -= limit.value;
        return fetchManga();
    };

    return {
        manga,
        offset,
        fetchManga,
        nextOffSet,
        prevOffset,
    };
};
