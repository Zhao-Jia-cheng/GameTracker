import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGameById } from '../api';

export default function ItemDetail() {
  const { id } = useParams();
  const numericId = Number(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items', numericId],
    queryFn: () => fetchGameById(numericId),
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
      <p>Status: {data.status}</p>
      <p>Rating: {data.rating ?? 'Not rated'}</p>
      <p>Note: {data.note ?? 'No note'}</p>
    </div>
  );
}