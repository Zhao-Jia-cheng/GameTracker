import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Density = 'compact' | 'comfortable';

interface UiState {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  setDensity: (density: Density) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'light',
      density: 'comfortable',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setDensity: (density) => set({ density }),
    }),
    { name: 'gamevault.ui' }
  )
);
