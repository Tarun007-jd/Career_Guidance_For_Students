
const Login: React.FC<{ onLogin: (name: string) => void }> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // In development, allow any credentials
    setTimeout(() => {
      if (name && password) {
        onLogin(name);
      } else {
        setError('Please enter both name and password.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-pink-100 dark:from-gray-900 dark:via-blue-950 dark:to-teal-900">
      <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">Sign In</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">Welcome back! Please login to your account.</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg shadow"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg shadow"
        />
        {error && <div className="text-red-500 text-center font-medium">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="text-xs text-center text-gray-400 mt-4 italic">Development mode: Any credentials are accepted.</div>
      </form>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
