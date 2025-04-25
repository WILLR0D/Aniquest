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