import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api';
import { useUiStore } from '../store';

const STATUS_COLORS: Record<string, string> = {
  want: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  done: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  dropped: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
};

const STATUS_LABEL: Record<string, string> = {
  want: 'Want to Play',
  active: 'Currently Playing',
  done: 'Finished',
  dropped: 'Dropped',
};

export default function StatusList() {
  const { status } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const density = useUiStore((state) => state.density);

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

  if (isLoading) return <p className="text-center py-12 text-slate-500">Loading games...</p>;
  if (isError) return <p className="text-center py-12 text-rose-500">Something went wrong loading this list.</p>;

  const games = data ?? [];
  const byStatus = games.filter((game) => game.status === status);
  const filtered = byStatus.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  const cardPadding = density === 'compact' ? 'p-3' : 'p-5';
  const gap = density === 'compact' ? 'gap-2' : 'gap-4';
  const label = status && STATUS_LABEL[status] ? STATUS_LABEL[status] : status;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{label}</h1>

      <input
        type="text"
        placeholder="Search titles..."
        value={query}
        onChange={handleSearchChange}
        className="w-full mb-6 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {filtered.length === 0 && (
        <p className="text-center py-12 text-slate-500 dark:text-slate-400">No games match.</p>
      )}

      <ul className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gap}`}>
        {filtered.map((game) => (
          <li key={game.id}>
            <Link
              to={`/items/${game.id}`}
              className={`block ${cardPadding} rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow`}
            >
              {game.imageUrl && (
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
              )}
              <h3 className="font-semibold text-sm">{game.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {game.creator} · {game.year}
              </p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[game.status]}`}>
                {game.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}