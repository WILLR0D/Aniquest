import axios from "axios";

const API_BASE = "https://api.jikan.moe/v4";

export const fetchAnimeList = async (query = "") => {
    const res = await axios.get(`${API_BASE}/anime`, {
        params: { q: query, limit: 12 },
    });
    return res.data.data;
};

export const fetchAnimeById = async (id) => {
    const res = await axios.get(`${API_BASE}/anime/${id}`);
    return res.data.data;
};


export const fetchSeasonalAnime = async (page = 1) => {
    const res = await axios.get(`${API_BASE}/seasons/now`, { params: { page } });
    return res.data.data;
};

export const fetchTopAnime = async (page = 1) => {
    const res = await axios.get(`${API_BASE}/top/anime`, { params: { page } });
    return res.data.data;
};

export const fetchAnimeByGenre = async (genreId, page = 1) => {
    const res = await axios.get(`${API_BASE}/anime`, {
        params: {
            genres: genreId,
            page,
        },
    });
    return res.data.data;
};
