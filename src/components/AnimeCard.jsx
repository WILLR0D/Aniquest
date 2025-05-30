import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AnimeCard({ anime }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <motion.div
      layout
      onClick={() =>
        navigate(`/anime/${anime.mal_id}`, { state: { background: location } })
      }
      className="
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-200
        rounded-2xl overflow-hidden shadow
        hover:shadow-lg cursor-pointer
        transition-transform transform hover:-translate-y-1
      "
    >
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold truncate">
          {anime.title_english || anime.title}
        </h3>
      </div>
    </motion.div>
  )
}
