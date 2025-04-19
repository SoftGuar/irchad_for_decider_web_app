'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../utils/userContext';
import { authApi } from '../../services/authapi';

export default function LoginPage() {
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(email, password);

      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        document.cookie = `token=${response.token}; path=/; max-age=${60 * 60 * 24}`;

        setUser(response.user);
        router.push('/(logged_in)');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
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

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

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
              className="w-full bg-[#FF8B00] p-3 rounded-lg font-semibold text-black disabled:opacity-50"
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
          priority
        />
      </div>
    </div>
  );
}
