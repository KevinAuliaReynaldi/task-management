// app/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push('/dashboard/user');
        router.refresh();
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
        
        {/* Left Side - Branding & Info */}
        <div className="lg:w-2/5 p-8 lg:p-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <span className="text-3xl">✅</span>
                </div>
                <h1 className="text-3xl font-bold">TaskFlow Pro</h1>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Streamline Your
                <span className="block text-blue-100">Workflow</span>
                Efficiently
              </h2>
              
              <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
                Professional task management system with role-based access control.
                Collaborate, assign, and track tasks seamlessly across your organization.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                  <span className="text-green-300">✓</span>
                </div>
                <span className="text-blue-100">Role-based access control</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                  <span className="text-green-300">✓</span>
                </div>
                <span className="text-blue-100">Real-time task tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                  <span className="text-green-300">✓</span>
                </div>
                <span className="text-blue-100">Secure & reliable platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-3/5 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Welcome Back 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to access your dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 animate-fadeIn">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/40 mr-3">
                    <span className="text-red-600 dark:text-red-400 text-xl">⚠️</span>
                  </div>
                  <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">📧</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg font-semibold relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative flex items-center justify-center space-x-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Sign In to Dashboard</span>
                    </>
                  )}
                </span>
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    Demo Accounts
                  </span>
                </div>
              </div>

              {/* Demo Accounts */}
              <div className="space-y-4">
                <div 
                  onClick={() => {
                    setEmail('admin@gmail.com');
                    setPassword('admin123');
                  }}
                  className="p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <span className="text-white">👑</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Admin Account
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Full access to all features
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmail('admin@gmail.com');
                        setPassword('admin123');
                      }}
                    >
                      Use This
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-mono bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
                    admin@gmail.com / admin123
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setEmail('user@gmail.com');
                    setPassword('user123');
                  }}
                  className="p-4 rounded-xl border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                        <span className="text-white">👤</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          User Account
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Limited access for task management
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmail('user@gmail.com');
                        setPassword('user123');
                      }}
                    >
                      Use This
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-mono bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
                    user@gmail.com / user123
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-green-300/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}