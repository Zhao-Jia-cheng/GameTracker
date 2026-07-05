import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGameById, updateGameStatus, updateGameNote, updateGameRating } from '../api';
import type { GameStatus } from '../types';

const STATUS_OPTIONS: GameStatus[] = ['want', 'active', 'done', 'dropped'];

export default function ItemDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items', numericId],
    queryFn: () => fetchGameById(numericId),
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus: GameStatus) => updateGameStatus(numericId, newStatus),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  });

  const noteMutation = useMutation({
    mutationFn: (newNote: string) => updateGameNote(numericId, newNote),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  });

  const ratingMutation = useMutation({
    mutationFn: (newRating: number) => updateGameRating(numericId, newRating),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  });

  if (isLoading) return <p className="text-center py-12 text-slate-500">Loading game...</p>;
  if (isError) return <p className="text-center py-12 text-rose-500">Something went wrong loading this game.</p>;
  if (!data) return <p className="text-center py-12 text-slate-500">Not found — no game with that id.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">← Back to catalog</Link>

      <div className="mt-3 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {data.creator} · {data.year} · {data.genre}
        </p>

        {data.detailImageUrl && (
          <img
            src={data.detailImageUrl}
            alt={data.title}
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        )}

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</label>
            <select
              value={data.status}
              onChange={(e) => statusMutation.mutate(e.target.value as GameStatus)}
              className="block mt-1 w-full sm:w-auto px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Rating</label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => ratingMutation.mutate(star)}
                  className={`text-2xl leading-none transition-colors ${
                    data.rating !== null && star <= data.rating
                      ? 'text-amber-400'
                      : 'text-slate-300 dark:text-slate-600 hover:text-amber-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Note</label>
            <textarea
              defaultValue={data.note ?? ''}
              onBlur={(e) => noteMutation.mutate(e.target.value)}
              placeholder="Add a note..."
              rows={3}
              className="block mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}