import { Routes, Route, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Catalog from './pages/Catalog';
import ItemDetail from './pages/ItemDetail';
import StatusList from './pages/StatusList';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { useUiStore } from './store';

export default function App() {
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const density = useUiStore((state) => state.density);
  const setDensity = useUiStore((state) => state.setDensity);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1 text-sm font-medium">
        <NavLink to="/" end className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Home</NavLink>
        <NavLink to="/list/want" className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Want</NavLink>
        <NavLink to="/list/active" className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Active</NavLink>
        <NavLink to="/list/done" className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Done</NavLink>
        <NavLink to="/list/dropped" className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Dropped</NavLink>
        <NavLink to="/about" className={({ isActive }) => `px-2 py-1 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>About</NavLink>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <select
          value={density}
          onChange={(e) => setDensity(e.target.value as 'compact' | 'comfortable')}
          className="text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5"
        >
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </div>
    </nav>

    <main className="max-w-4xl mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/list/:status" element={<StatusList />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);
}
