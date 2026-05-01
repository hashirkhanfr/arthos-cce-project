'use client';

export default function BlogFilters({ currentFilter, onFilterChange, counts }) {
    const filters = [
        { id: 'all', label: 'All Articles', count: counts.all },
        { id: 'published', label: 'Published', count: counts.published },
        { id: 'draft', label: 'Drafts', count: counts.draft },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                        currentFilter === filter.id
                            ? 'bg-[#1F6F3D] text-white shadow-md shadow-green-900/20'
                            : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                    }`}
                >
                    {filter.label} ({filter.count})
                </button>
            ))}
        </div>
    );
}
