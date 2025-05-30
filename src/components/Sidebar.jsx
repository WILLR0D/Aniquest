import { HiHome, HiChartBar, HiCollection, HiUsers } from 'react-icons/hi'

export default function Sidebar({ onSearch, onCategorySelect }) {
    return (
        <aside className="w-60 bg-white dark:bg-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">AniQuest</h2>
                <input
                    type="text"
                    placeholder="Buscar anime..."
                    onChange={e => onSearch(e.target.value)}
                    className="mt-4 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
                />
            </div>
            <nav className="mt-6">
                <ul>
                    <li>
                        <button
                            className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            onClick={() => onCategorySelect(null)}
                        >
                            <HiHome className="mr-2" /> Inicio
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            onClick={() => onCategorySelect('popular')}
                        >
                            <HiChartBar className="mr-2" /> Populares
                        </button>
                    </li>
                    <li className="mt-4 px-4 text-gray-500 dark:text-gray-400 uppercase text-xs">Categorías</li>
                    {['Action', 'Romance', 'Isekai', 'Shounen', 'Comedy', 'Horror', 'Drama'].map(cat => (
                        <li key={cat}>
                            <button
                                className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                onClick={() => onCategorySelect(cat)}
                            >
                                <HiCollection className="mr-2" /> {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
