import axios from "axios";

const url = "https://api.artic.edu/api/v1/artworks"

export const getArtWork = (id) =>
    axios.get(`${url}/${id}`);

export const getArtWorkList = (params) =>
    axios.get(`${url}`, { params });
