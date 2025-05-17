import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { MovieDetail, Credit } from '../api/tmdb';
import { fetchMovieDetail, fetchCredits } from '../api/tmdb';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Credit[]>([]);
  const [director, setDirector] = useState<Credit | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const detail = await fetchMovieDetail(id);
      const { cast: castRes, crew } = await fetchCredits(id);
      setMovie(detail);
      setCast(castRes.slice(0, 5));
      setDirector(crew.find((c) => c.job === 'Director') ?? null);
    }
    load().catch(console.error);
  }, [id]);

  if (!movie) return <p className="text-center items-center py-8">Loading detail…</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => nav(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back to list
      </button>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-screen bg-black rounded-lg shadow-md ">
        <img
          className="w-full md:w-1/3 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-orange-600">{movie.title}</h2>
          <h2>Synopsis:</h2>
          <p className="mb-4">{movie.overview}</p>

          <p className="mb-2">
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Director:</span> {director?.name}
          </p>
          <div>
            <span className="font-semibold">Main Cast:</span>
            <ul className="list-disc list-inside mt-1">
              {cast.map((c) => (
                <li key={c.cast_id}>{c.name} as {c.character}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}