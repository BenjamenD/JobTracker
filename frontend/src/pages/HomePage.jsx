import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from '../api/axiosInstance.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import ApplyButton from '../components/ApplyButton.jsx';
import BookmarkButton from '../components/BookmarkButton.jsx';
import SearchFilterBar from '../components/SearchFilterBar.jsx';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // UI filter state (client-side only; backend requests unchanged)
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sort, setSort] = useState('newest');

  // Keep an imperative page reference to avoid stale closures
  const pageRef = useRef(1);
  // Prevent double initial fetch in React StrictMode (dev)
  const initialFetchDoneRef = useRef(false);

  const LIMIT = 20;

  const fetchJobs = async (pageToFetch) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/jobs?page=${pageToFetch}&limit=${LIMIT}`);
      const newItems = Array.isArray(res.data.jobs) ? res.data.jobs : [];

      setItems((prev) => {
        const merged = [...prev, ...newItems];
        const seenIds = new Set();
        return merged.filter((job) => {
          if (!job || !job._id) return false;
          if (seenIds.has(job._id)) return false;
          seenIds.add(job._id);
          return true;
        });
      });

      if (newItems.length < LIMIT) {
        setHasMore(false);
      } else {
        const nextPage = pageToFetch + 1;
        pageRef.current = nextPage;
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetchDoneRef.current) return;
    initialFetchDoneRef.current = true;
    pageRef.current = 1;
    setPage(1);
    fetchJobs(1);
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    fetchJobs(pageRef.current);
  };

  // derive available tags from currently loaded items
  const availableTags = useMemo(() => {
    const tagSet = new Set();
    for (const job of items) {
      const tags = Array.isArray(job?.tags) ? job.tags : [];
      for (const t of tags) tagSet.add(t);
    }
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [items]);

  // apply client-side filtering and sorting
  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasQuery = q.length > 0;
    const hasTagFilters = selectedTags.length > 0;

    const filtered = items.filter((job) => {
      if (!job) return false;
      const title = String(job.title || '').toLowerCase();
      const company = String(job.company || '').toLowerCase();
      const tags = Array.isArray(job.tags) ? job.tags : [];

      const matchesQuery = !hasQuery
        ? true
        : title.includes(q) || company.includes(q) || tags.some((t) => String(t).toLowerCase().includes(q));

      const matchesTags = !hasTagFilters
        ? true
        : tags.some((t) => selectedTags.includes(t)); // OR logic

      return matchesQuery && matchesTags;
    });

    const sorted = [...filtered];
    if (sort === 'newest') {
      sorted.sort((a, b) => new Date(b.date_posted || 0) - new Date(a.date_posted || 0));
    } else if (sort === 'oldest') {
      sorted.sort((a, b) => new Date(a.date_posted || 0) - new Date(b.date_posted || 0));
    } else if (sort === 'az') {
      sorted.sort((a, b) => String(a.title || '').localeCompare(String(b.title || '')));
    }
    return sorted;
  }, [items, query, selectedTags, sort]);

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleClearFilters = () => {
    setQuery('');
    setSelectedTags([]);
    setSort('newest');
  };

  return (
    <div className="p-0">
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onToggleTag={handleToggleTag}
        sort={sort}
        onSortChange={setSort}
        onClear={handleClearFilters}
      />

      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<p className="text-center text-slate-500 py-3">Loading…</p>}
        endMessage={<p className="text-center text-slate-400 py-3">No more jobs.</p>}
      >
        <ul className="grid grid-cols-1 gap-3">
          {filteredAndSorted.map((job) => {
            const tags = Array.isArray(job?.tags) ? job.tags : [];
            return (
              <li key={job._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">{job.title}</h2>
                    <p className="mt-0.5 text-sm text-slate-600">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-1 text-lg text-slate-500">
                    <BookmarkButton jobId={job._id} />
                    <ApplyButton jobId={job._id} />
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span key={i} className="text-[11px] sm:text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition"
                  >
                    View role
                  </a>
                  <p className="text-xs text-slate-500">Posted {new Date(job.date_posted).toLocaleDateString()}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
