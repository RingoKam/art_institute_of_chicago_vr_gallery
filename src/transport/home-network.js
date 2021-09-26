import axios from 'axios'
const url = "https://api.mangadex.org/at-home/server"

export const getHomeUrl = (chapterId) => {
    return axios.get(`${url}/${chapterId}`).then(({ data }) => {
        return data.baseUrl 
    })
}