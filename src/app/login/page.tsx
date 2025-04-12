"use client";

import Image from 'next/image';
import { useState } from 'react';
import { authApi } from '../../services/authapi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.data.token);
      window.location.href = '/'; // Rediriger après connexion
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#1E1E1E] text-white p-0 m-0">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-4">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            <span className="text-xl ml-2">IRCHAD</span>
          </div>

          <h1 className="text-3xl font-semibold mb-4 text-center">Sign In</h1>
          <p className="text-gray-400 text-center mb-6">Sign in to stay connected.</p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" /> Remember me?
              </label>
              <a href="#" className="text-orange-500 text-sm">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF8B00] p-3 rounded-lg font-semibold text-black"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 relative">
        <Image
          src="/images/login_image.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
