import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4 select-none">🕹️</p>
      <h1 className="text-xl font-bold text-slate-700 dark:text-slate-200">404 — Page Not Found</h1>
      <p className="text-sm mt-1 text-slate-400 dark:text-slate-500">
        This page doesn't exist in GameVault.
      </p>
      <Link to="/" className="inline-block mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
        ← Back to catalog
      </Link>
    </div>
  );
}