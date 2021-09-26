import axios from "axios";

export const getChapter = (chapterId) =>
    axios.get(`https://api.mangadex.org/chapter/${chapterId}`);

export const getChapterList = (params) =>
    axios.get("https://api.mangadex.org/chapter", { params });
