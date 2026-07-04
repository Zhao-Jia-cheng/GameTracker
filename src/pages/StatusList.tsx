import { useParams, useSearchParams } from 'react-router-dom';

export default function StatusList() {
  const { status } = useParams();
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
      <h1>Status list page — showing: {status}</h1>
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
