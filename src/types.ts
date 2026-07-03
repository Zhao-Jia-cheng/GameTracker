export type GameStatus = 'want' | 'active' | 'done' | 'dropped';

export interface Game {
  id: number;
  title: string;
  creator: string;
  year: number;
  genre: string;
  status: GameStatus;
  rating: number | null;
  note: string | null;
}