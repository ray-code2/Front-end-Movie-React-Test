import { useState } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/FilterCategory';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('movie/popular');

  const endpoint = search
    ? `search/movie?query=${encodeURIComponent(search)}`
    : category;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold p-4 text-blue-600">Movie Browser</h1>
      
      <div className="p-4">
        <SearchBar onSearch={setSearch} />
        <CategoryFilter selected={category} onChange={setCategory} />
        <MovieList endpoint={endpoint} />
      </div>
    </div>
  );
}
