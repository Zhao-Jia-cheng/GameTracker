import { useSearchParams } from 'react-router-dom';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div>
      <h1>Catalog page</h1>
      <input
        type="text"
        placeholder="Search titles..."
        value={query}
        onChange={handleSearchChange}
      />
      <p>Current search: {query || '(none)'}</p>
    </div>
  );
}
