import { HiHome, HiChartBar, HiCollection, HiUsers } from 'react-icons/hi'

export default function Sidebar({ onSearch, onCategorySelect }) {
    return (
        <aside className="w-60 bg-white border-r h-screen sticky top-0">
            <div className="p-4">
                <h2 className="text-2xl font-bold">AniQuest</h2>
                <input
                    type="text"
                    placeholder="Buscar anime..."
                    onChange={e => onSearch(e.target.value)}
                    className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
            </div>
            <nav className="mt-6">
                <ul>
                    <li>
                        <button className="flex items-center px-4 py-2 w-full hover:bg-gray-100" onClick={() => onCategorySelect(null)}>
                            <HiHome className="mr-2" /> Inicio
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center px-4 py-2 w-full hover:bg-gray-100" onClick={() => onCategorySelect('popular')}>
                            <HiChartBar className="mr-2" /> Populares
                        </button>
                    </li>
                    <li className="mt-4 px-4 text-gray-500 uppercase text-xs">Categorías</li>
                    <li>
                        <button className="flex items-center px-4 py-2 w-full hover:bg-gray-100" onClick={() => onCategorySelect('Action')}>
                            <HiCollection className="mr-2" /> Acción
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center px-4 py-2 w-full hover:bg-gray-100" onClick={() => onCategorySelect('Romance')}>
                            <HiUsers className="mr-2" /> Romance
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
