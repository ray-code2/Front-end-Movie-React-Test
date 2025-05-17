

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="w-full border rounded p-2 mb-4"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}