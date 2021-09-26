import axios from 'axios'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const uploadUrl = "https://uploads.mangadex.org/covers"

export const getCoverArt = (mangaId) => axios.get(`https://api.mangadex.org/cover`, {
    params: {
        limit: 100,
        manga: [mangaId]
    },
})

export const generateCoverUrl = (mangaId, coverUrl) => `${uploadUrl}/${mangaId}/${coverUrl}`