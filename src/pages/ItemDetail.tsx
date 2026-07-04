import { useParams } from 'react-router-dom';
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const noteMutation = useMutation({
    mutationFn: (newNote: string) => updateGameNote(numericId, newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const ratingMutation = useMutation({
    mutationFn: (newRating: number) => updateGameRating(numericId, newRating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  if (isLoading) return <p>Loading game...</p>;
  if (isError) return <p>Something went wrong loading this game.</p>;
  if (!data) return <p>Not found — no game with that id.</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Creator: {data.creator}</p>
      <p>Year: {data.year}</p>
      <p>Genre: {data.genre}</p>

      <p>
        Status:{' '}
        <select
          value={data.status}
          onChange={(e) => statusMutation.mutate(e.target.value as GameStatus)}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </p>

      <p>
        Rating:{' '}
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => ratingMutation.mutate(star)}>
            {data.rating !== null && star <= data.rating ? '★' : '☆'}
          </button>
        ))}
      </p>

      <p>
        Note:{' '}
        <textarea
          defaultValue={data.note ?? ''}
          onBlur={(e) => noteMutation.mutate(e.target.value)}
        />
      </p>
    </div>
  );
}
