import { sortBy, keyBy } from 'lodash'

export const formatMangaList = (mangaList) => {
    return mangaList.map(manga => {
        const { id, type, relationships, attributes } = manga
        return {
            id,
            type, 
            ...attributes,
            relationships: keyBy(relationships, "type")
        }
    })
}

export const formatChapterList = (chapterList) => {
    const list = chapterList.map(manga => {
        const { id, type, attributes, relationships } = manga
        return {
            ...attributes,
            relationships,
            id, 
            type,
        }
    })
    return sortBy(list, [v => parseInt(v?.volume || "0"), v => parseInt(v?.chapter || "0")])
}

export const formatCoverArt = ({ data }) => {
    const covers = data.data 
    const list = covers.map(cover => {
        const  { attributes, ...meta } = cover
        return { ...attributes, ...meta }
    })
    return keyBy(list, c => c.volume)
}