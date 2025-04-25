import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function AnimeDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [anime, setAnime] = useState(null)

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then(r => r.json())
            .then(data => setAnime(data.data))
    }, [id])

    if (!anime) return <p>Cargando…</p>

    return (
        <div className="p-6">
            <button onClick={() => navigate(-1)} className="mb-4">← Volver</button>
            <h1 className="text-2xl font-bold mb-2">
                {anime.title_english || anime.title}
            </h1>
            <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full max-w-md rounded-lg mb-4"
            />
            <p className="text-sm text-gray-700">{anime.synopsis}</p>
        </div>
    )
}
