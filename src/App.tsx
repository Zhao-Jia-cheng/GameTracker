import { Routes, Route, NavLink } from 'react-router-dom';
import Catalog from './pages/Catalog';
import ItemDetail from './pages/ItemDetail';
import StatusList from './pages/StatusList';
import NotFound from './pages/NotFound';

export default function App() {
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
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/list/:status" element={<StatusList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
