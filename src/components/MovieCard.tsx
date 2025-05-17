
import { Link } from 'react-router-dom';
import type { Movie } from '../api/tmdb';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block transform hover:scale-105 transition">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-transparent hover:border-orange-700">
        <img
          className="object-cover w-full h-64 h-max-64 md:h-auto md:w-30"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold w-30 truncate md:text-xl white-space-nowrap text-wrap overflow-hidden text-orange-700">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
          <span className=" mt-4 h-8 w-26 inline-block text-wrap transparent bg-blue-500 text-white text-xs px-3 py-2  rounded-full overflow-hidden text-center">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}