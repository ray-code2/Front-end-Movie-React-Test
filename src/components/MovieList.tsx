import { useEffect, useState } from 'react';
import { fetchMovies } from '../api/tmdb';
import MovieCard from './MovieCard';
import type { Movie } from '../api/tmdb';

export default function MovieList({ endpoint }: { endpoint: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [endpoint]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchMovies(endpoint, page);
  
        if (page === 1) {
          setMovies(res);
        } else {
          setMovies((prev) => [...prev, ...res]);
        }
    
        setHasMore(res.length > 0);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    load();
  }, [endpoint, page]);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-template-rows-auto">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
