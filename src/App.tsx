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
    <div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        {' | '}
        <NavLink to="/list/want">Want</NavLink>
        {' | '}
        <NavLink to="/list/active">Active</NavLink>
        {' | '}
        <NavLink to="/list/done">Done</NavLink>
        {' | '}
        <NavLink to="/list/dropped">Dropped</NavLink>
        {' | '}
        <NavLink to="/about">About</NavLink>

        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <select value={density} onChange={(e) => setDensity(e.target.value as 'compact' | 'comfortable')}>
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </nav>

      <main>
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
