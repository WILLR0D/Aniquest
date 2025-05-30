import React from 'react';

export default function AnimeModal({ anime, relations, onClose }) {
    if (!anime) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="w-[92vw] max-w-[440px] max-h-[80vh] h-[420px] min-h-[420px] rounded-2xl shadow-2xl bg-transparent flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl w-full h-full flex flex-row overflow-hidden">
                    {/* Imagen a la izquierda */}
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 h-full w-[160px] p-4">
                        <img
                            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                            alt={anime.title}
                            className="rounded-lg object-cover w-full h-[320px] max-h-[60vh]"
                            loading="eager"
                        />
                    </div>
                    {/* Contenido */}
                    <div className="flex-1 p-4 flex flex-col min-h-0">
                        <div>
                            <h2 className="text-2xl font-bold mb-1 truncate text-gray-900 dark:text-gray-100">{anime.title}</h2>
                            {anime.title_english && (
                                <h3 className="text-md text-gray-500 dark:text-gray-300 italic mb-2 truncate">{anime.title_english}</h3>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="mb-2">
                                <div className="h-[80px] max-h-[80px] min-h-[80px] overflow-y-auto pr-2 bg-gray-50 dark:bg-gray-800 rounded p-2 break-words whitespace-pre-line">
                                    <p className="text-sm text-justify leading-relaxed text-gray-800 dark:text-gray-200 break-words whitespace-pre-line">
                                        {anime.synopsis || "Sin descripción disponible."}
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm space-y-1 mb-2 text-gray-700 dark:text-gray-200">
                                <p><strong className="text-gray-900 dark:text-gray-100">Tipo:</strong> {anime.type}</p>
                                <p><strong className="text-gray-900 dark:text-gray-100">Episodios:</strong> {anime.episodes}</p>
                                <p><strong className="text-gray-900 dark:text-gray-100">Estado:</strong> {anime.status}</p>
                                <p><strong className="text-gray-900 dark:text-gray-100">Fecha de emisión:</strong> {anime.aired?.string}</p>
                                <p><strong className="text-gray-900 dark:text-gray-100">Score:</strong> {anime.score}</p>
                            </div>
                            {relations?.length > 0 && (
                                <div className="text-sm overflow-y-auto max-h-[60px] min-h-[60px] bg-gray-50 dark:bg-gray-800 rounded p-2 text-gray-800 dark:text-gray-200">
                                    <h4 className="font-semibold mt-0 mb-1 text-gray-900 dark:text-gray-100">Relaciones:</h4>
                                    <ul className="list-disc list-inside">
                                        {relations.map((rel, i) => (
                                            <li key={i} className="truncate">
                                                {rel.relation}: {rel.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
