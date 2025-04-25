import Sidebar from '../components/Sidebar'
import AnimeCard from '../components/AnimeCard'
import { useState, useEffect } from 'react'

export default function Home() {
    const [animes, setAnimes] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        fetch('https://api.jikan.moe/v4/anime?limit=24')
            .then(r => r.json())
            .then(data => {
                setAnimes(data.data)
                setFiltered(data.data)
            })
    }, [])

    const handleSearch = q => {
        const low = q.toLowerCase()
        setFiltered(
            animes.filter(a =>
                a.title.toLowerCase().includes(low) ||
                (a.title_english && a.title_english.toLowerCase().includes(low))
            )
        )
    }

    const handleCategory = cat => {
        if (!cat) return setFiltered(animes)
        if (cat === 'popular') return setFiltered(animes.filter(a => a.rank <= 10))
        setFiltered(animes.filter(a =>
            a.genres.some(g => g.name === cat)
        ))
    }

    return (
        <div className="flex">
            <Sidebar onSearch={handleSearch} onCategorySelect={handleCategory} />

            <main className="flex-1 p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Lista de Animes</h1>
                <div className="
          grid gap-8
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          lg:grid-cols-4 xl:grid-cols-5
          auto-rows-fr
        ">
                    {filtered.map(a => (
                        <AnimeCard key={a.mal_id} anime={a} />
                    ))}
                </div>
            </main>
        </div>
    )
}
