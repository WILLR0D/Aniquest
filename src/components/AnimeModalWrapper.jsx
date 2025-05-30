import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimeModal from './AnimeModal';

export default function AnimeModalWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);
    const [relations, setRelations] = useState([]);

    useEffect(() => {
        const fetchAnimeAndRelations = async () => {
            try {
                const [animeRes, relRes] = await Promise.all([
                    fetch(`https://api.jikan.moe/v4/anime/${id}`).then(res => res.json()),
                    fetch(`https://api.jikan.moe/v4/anime/${id}/relations`).then(res => res.json())
                ]);

                setAnime(animeRes.data);
                const allRelations = relRes.data.flatMap(group =>
                    group.entries.map(entry => ({
                        ...entry,
                        relation: group.relation
                    }))
                );
                setRelations(allRelations);
            } catch (err) {
                console.error("Error al cargar anime o relaciones", err);
            }
        };

        fetchAnimeAndRelations();
    }, [id]);

    return <AnimeModal anime={anime} relations={relations} onClose={() => navigate(-1)} />;
}
