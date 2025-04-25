import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimeModal from './AnimeModal'

export default function AnimeModalWrapper() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [anime, setAnime] = useState(null)

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then(res => res.json())
            .then(data => setAnime(data.data))
    }, [id])

    return <AnimeModal anime={anime} onClose={() => navigate(-1)} />
}
