import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}
export interface MovieDetail extends Movie {
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
}

export interface Credit {
  id: number;
  name: string;
  job?: string;
  character?: string;
  cast_id?: number;
}


export async function fetchMovieDetail(
  id: string
): Promise<MovieDetail> {
  const res = await axios.get<MovieDetail>(
    `${BASE_URL}/movie/${id}`,
    { params: { api_key: API_KEY } }
  );
  return res.data;
}

export async function fetchCredits(
  id: string
): Promise<{ cast: Credit[]; crew: Credit[] }> {
  const res = await axios.get<{ cast: Credit[]; crew: Credit[] }>(
    `${BASE_URL}/movie/${id}/credits`,
    { params: { api_key: API_KEY } }
  );
  return res.data;
}

export async function fetchMovies(endpoint: string, page = 1) {
  const res = await axios.get<{ results: Movie[] }>(
    `${BASE_URL}/${endpoint}`,
    { params: { api_key: API_KEY, page } }
  );
  return res.data.results;
}