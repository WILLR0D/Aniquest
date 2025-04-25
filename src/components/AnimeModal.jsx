import { motion, AnimatePresence } from "framer-motion";

export default function AnimeModal({ anime, onClose }) {
    if (!anime) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-lg max-w-xl w-full relative"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <img
                        src={anime.images?.jpg?.large_image_url}
                        alt={anime.title}
                        className="rounded-t-2xl w-full h-[400px] object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-2xl font-bold">{anime.title_english || anime.title}</h2>
                        <p className="text-gray-700 mt-2">{anime.synopsis}</p>
                        <p className="mt-4 text-sm text-gray-500">Episodios: {anime.episodes}</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
