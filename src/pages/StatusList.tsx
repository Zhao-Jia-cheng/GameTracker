import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api';

export default function StatusList() {
  const { status } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items'],
    queryFn: fetchGames,
  });

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  if (isLoading) return <p>Loading games...</p>;
  if (isError) return <p>Something went wrong loading this list.</p>;

  const games = data ?? [];
  const byStatus = games.filter((game) => game.status === status);
  const filtered = byStatus.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Games — {status}</h1>
      <input
        type="text"
        placeholder="Search titles..."
        value={query}
        onChange={handleSearchChange}
      />

      {filtered.length === 0 && <p>No games match.</p>}

      <ul>
        {filtered.map((game) => (
          <li key={game.id}>
            <Link to={`/items/${game.id}`}>{game.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}