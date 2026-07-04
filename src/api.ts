import type { Game } from './types';

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
