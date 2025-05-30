import Sidebar from '../components/Sidebar'
import AnimeCard from '../components/AnimeCard'
import { useState, useEffect, useCallback, useRef } from 'react'

// Mapeo de nombre de categoría a ID de género de Jikan
const GENRE_MAP = {
    Action: 1,
    Romance: 22,
    Isekai: 62,
    Shounen: 27,
    Comedy: 4,
    Horror: 14,
    Drama: 8,
};

const STATUS_OPTIONS = [
    { label: "Todos", value: "" },
    { label: "En emisión", value: "airing" },
    { label: "Finalizado", value: "complete" },
];

const TYPE_OPTIONS = [
    { label: "Todos", value: "" },
    { label: "TV", value: "tv" },
    { label: "OVA", value: "ova" },
    { label: "ONA", value: "ona" },
    { label: "Película", value: "movie" },
    { label: "Especial", value: "special" },
    { label: "Music", value: "music" },
];

const NSFW_GENRES = ["Hentai", "Ecchi", "Erotica"];

function isNSFW(anime) {
    // Verifica tanto en explicit_genres como en genres
    const allGenres = [
        ...(anime.explicit_genres || []),
        ...(anime.genres || []),
        ...(anime.themes || []),
        ...(anime.demographics || []),
    ];
    return allGenres.some(g => NSFW_GENRES.includes(g.name));
}

export default function Home() {
    const [animes, setAnimes] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState('season') // 'season', 'search', 'genre', 'popular'
    const [query, setQuery] = useState('')
    const [genreId, setGenreId] = useState(null)
    const [status, setStatus] = useState("")
    const [type, setType] = useState("")
    const [hideNSFW, setHideNSFW] = useState(true)

    // Para evitar múltiples cargas al cambiar filtros
    const filtersRef = useRef({ mode, query, genreId, status, type, hideNSFW });

    // Reiniciar lista y página al cambiar filtros principales
    useEffect(() => {
        setAnimes([])
        setPage(1)
        setHasMore(true)
        filtersRef.current = { mode, query, genreId, status, type, hideNSFW }
    }, [mode, query, genreId, status, type, hideNSFW])

    // Cargar animes cuando cambia la página o los filtros
    useEffect(() => {
        let cancel = false
        const fetchAnimes = async () => {
            setLoading(true)
            let url = ''
            let params = []
            if (mode === 'season') {
                url = `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=24`
            } else if (mode === 'search') {
                url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=24`
            } else if (mode === 'genre') {
                url = `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&limit=24&order_by=popularity`
            } else if (mode === 'popular') {
                url = `https://api.jikan.moe/v4/top/anime?page=${page}&limit=24`
            }

            // Filtros adicionales
            if (status) params.push(`status=${status}`)
            if (type) params.push(`type=${type}`)
            if (hideNSFW) params.push("sfw=true")

            // Si no es "season", agregar filtros a la url
            if (url.includes("/anime")) {
                if (params.length > 0) {
                    url += (url.includes("?") ? "&" : "?") + params.join("&")
                }
            }

            const res = await fetch(url)
            const data = await res.json()
            let results = data.data || []
            // Filtrar NSFW localmente en todos los modos (por si la API falla)
            if (hideNSFW) {
                results = results.filter(a => !isNSFW(a))
            }
            // Filtro local por status y tipo para /seasons/now
            if (mode === "season" && status) {
                results = results.filter(a => {
                    if (status === "airing") return a.status === "Currently Airing"
                    if (status === "complete") return a.status === "Finished Airing"
                    return true
                })
            }
            if (mode === "season" && type) {
                results = results.filter(a => a.type && a.type.toLowerCase() === type)
            }
            if (cancel) return;
            setAnimes(prev => page === 1 ? results : [...prev, ...results])
            setHasMore(data.pagination?.has_next_page ?? false)
            setLoading(false)
        }
        fetchAnimes()
        return () => { cancel = true }
    }, [page, mode, query, genreId, status, type, hideNSFW])

    // Scroll infinito robusto y dependiente de los filtros
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (loading || !hasMore || ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
                    setPage(prev => {
                        // Solo incrementa si los filtros no han cambiado
                        const currentFilters = { mode, query, genreId, status, type, hideNSFW }
                        const lastFilters = filtersRef.current
                        const sameFilters = Object.keys(currentFilters).every(
                            k => currentFilters[k] === lastFilters[k]
                        )
                        return sameFilters ? prev + 1 : prev
                    })
                }
                ticking = false;
            });
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loading, hasMore, mode, query, genreId, status, type, hideNSFW])

    const handleSearch = q => {
        const trimmed = q.trim()
        if (!trimmed) {
            setMode('season')
            setQuery('')
            setGenreId(null)
            return
        }
        setMode('search')
        setQuery(trimmed)
        setGenreId(null)
    }

    const handleCategory = cat => {
        if (!cat) {
            setMode('season')
            setQuery('')
            setGenreId(null)
            return
        }
        if (cat === 'popular') {
            setMode('popular')
            setQuery('')
            setGenreId(null)
            return
        }
        const genre = GENRE_MAP[cat]
        if (genre) {
            setMode('genre')
            setGenreId(genre)
            setQuery('')
        }
    }

    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Sidebar onSearch={handleSearch} onCategorySelect={handleCategory} />

            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Animes en emisión
                </h1>
                {/* Filtros visualmente mejorados */}
                <div className="flex flex-wrap gap-3 mb-6 items-center bg-white/80 dark:bg-gray-800/80 rounded-lg px-4 py-2 shadow border border-gray-200 dark:border-gray-700">
                    {/* Estado */}
                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 dark:text-gray-200">Estado</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="rounded px-2 py-1 border dark:bg-gray-800 dark:text-gray-100 text-sm"
                        >
                            {STATUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Tipo */}
                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 dark:text-gray-200">Tipo</label>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="rounded px-2 py-1 border dark:bg-gray-800 dark:text-gray-100 text-sm"
                        >
                            {TYPE_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* NSFW */}
                    <div className="flex items-center ml-2">
                        <label className="mr-2 text-gray-700 dark:text-gray-200">Ocultar NSFW</label>
                        <label className="relative inline-flex items-center cursor-pointer w-10 h-5">
                            <input
                                type="checkbox"
                                checked={hideNSFW}
                                onChange={e => setHideNSFW(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500 dark:bg-gray-700 rounded-full peer peer-checked:bg-pink-500 transition-colors"></div>
                            <span className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white dark:bg-gray-900 shadow transform transition-transform duration-200 ${hideNSFW ? 'translate-x-5' : ''}`}></span>
                        </label>
                    </div>
                </div>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
                    {animes.map(a => (
                        <AnimeCard key={a.mal_id} anime={a} />
                    ))}
                </div>
                {loading && (
                    <div className="text-center text-gray-500 dark:text-gray-300 mt-4">Cargando...</div>
                )}
                {!hasMore && !loading && (
                    <div className="text-center text-gray-400 dark:text-gray-500 mt-4">No hay más resultados.</div>
                )}
            </main>
        </div>
    )
}
