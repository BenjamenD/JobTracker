import React from 'react'

const SearchFilterBar = ({
  query,
  onQueryChange,
  availableTags = [],
  selectedTags = [],
  onToggleTag,
  sort,
  onSortChange,
  onClear,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm mb-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search title, company, or tag…"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
            aria-label="Search"
          />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-slate-400"
            aria-label="Sort"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
          </select>
          <button
            type="button"
            onClick={onClear}
            className="hidden sm:inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>

        {availableTags.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {availableTags.map((tag) => {
              const active = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilterBar


