// app/dashboard/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  totalUsers: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  doneTasks: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (session?.user?.role !== 'ADMIN') {
      router.push('/dashboard/user');
    }

    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      
      const usersResponse = await fetch('/api/users');
      const users = await usersResponse.json();
      
      setStats({
        totalUsers: users.length,
        totalTasks: tasks.length,
        todoTasks: tasks.filter((t: any) => t.status === 'TODO').length,
        inProgressTasks: tasks.filter((t: any) => t.status === 'IN_PROGRESS').length,
        doneTasks: tasks.filter((t: any) => t.status === 'DONE').length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalTasks}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Todo Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.todoTasks}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Tasks</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.doneTasks}</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/dashboard/admin/users"
              className="block w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
            >
              👥 Manage Users
            </Link>
            <Link
              href="/dashboard/admin/tasks"
              className="block w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition"
            >
              ✅ Manage Tasks
            </Link>
            <Link
              href="/dashboard/admin/tasks/create"
              className="block w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition"
            >
              ➕ Create New Task
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-gray-600">
            <p>Welcome back, {session?.user?.name}!</p>
            <p className="mt-2">You have administrator privileges.</p>
            <p className="mt-2">Use the navigation above to manage users and tasks.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}