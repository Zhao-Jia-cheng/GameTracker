import type { Game, GameStatus } from './types';
const API_URL = 'http://localhost:3001';

export async function fetchGames(): Promise<Game[]> {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
}

export async function fetchGameById(id: number): Promise<Game | undefined> {
  const res = await fetch(`${API_URL}/items/${id}`);
  if (!res.ok) throw new Error('Failed to fetch game');
  return res.json();
}
export async function updateGameStatus(id: number, status: GameStatus): Promise<Game> {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}

export async function updateGameNote(id: number, note: string): Promise<Game> {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note }),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}

export async function updateGameRating(id: number, rating: number): Promise<Game> {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });
  if (!res.ok) throw new Error('Failed to update rating');
  return res.json();
}
