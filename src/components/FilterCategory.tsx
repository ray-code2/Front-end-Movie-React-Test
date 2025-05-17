const categories = [
  { label: 'Now Playing', key: 'movie/now_playing' },
  { label: 'Popular', key: 'movie/popular' },
  { label: 'Top Rated', key: 'movie/top_rated' },
  { label: 'Upcoming', key: 'movie/upcoming' },
];

export default function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-2 mb-8 mt-2">
      {categories.map((c) => (
        <button
          key={c.key}
          className={
            selected === c.key
              ? 'px-3 py-1 rounded bg-black text-white transform hover:scale-105 transition'
              : 'px-3 py-1 rounded bg-gray-500 transform hover:scale-105 transition'
          }
          onClick={() => onChange(c.key)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}