import axios from "axios";

export const getMangaList = (params) =>
    axios.get("https://api.mangadex.org/manga", { params });

export const getManga = (id) =>
    axios.get(`https://api.mangadex.org/manga/${id}`, {
        params: {
            contentRating: ["safe"],
            includes: ["cover_art"],
        },
    });
