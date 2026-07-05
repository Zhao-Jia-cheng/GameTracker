export default function About() {
  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h1 className="text-2xl font-bold mb-3">About GameVault</h1>
      <p className="text-slate-600 dark:text-slate-300">
        GameVault is a personal tracker for the games I'm playing, want to play,
        have finished, or dropped. Built for CSCI 39548 using React Router,
        TanStack Query, and Zustand.
      </p>
    </div>
  );
}
