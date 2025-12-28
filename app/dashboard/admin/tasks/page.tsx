// app/dashboard/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  CheckSquare, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  Calendar
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  doneTasks: number;
  recentTasks: any[];
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
    
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard/user');
    }

    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const [tasksResponse, usersResponse] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/users')
      ]);
      
      const tasks = await tasksResponse.json();
      const users = await usersResponse.json();
      
      const recentTasks = tasks
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      
      setStats({
        totalUsers: users.length,
        totalTasks: tasks.length,
        todoTasks: tasks.filter((t: any) => t.status === 'TODO').length,
        inProgressTasks: tasks.filter((t: any) => t.status === 'IN_PROGRESS').length,
        doneTasks: tasks.filter((t: any) => t.status === 'DONE').length,
        recentTasks
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{session?.user?.name}</span>! Here's what's happening.
        </p>
      </div>
      
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.totalUsers}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp size={14} className="mr-1" />
              <span>Growing community</span>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.totalTasks}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40">
                <CheckSquare className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Across all users
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.inProgressTasks}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40">
                <Clock className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Active tasks
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.doneTasks}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40">
                <CheckCircle className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400">
              <Activity size={14} className="mr-1" />
              <span>Great progress!</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Activity className="mr-3 text-blue-500" size={24} />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/dashboard/admin/users"
                className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all card-hover"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 mr-4">
                    <Users className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Manage Users
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  View, add, and manage user accounts and permissions
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span>Go to Users</span>
                  <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
              
              <Link
                href="/dashboard/admin/tasks"
                className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all card-hover"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/40 mr-4">
                    <CheckSquare className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Manage Tasks
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  View and manage all tasks across your organization
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  <span>Go to Tasks</span>
                  <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
              
              <Link
                href="/dashboard/admin/tasks/create"
                className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all card-hover"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/40 mr-4">
                    <CheckSquare className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Create Task
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create and assign new tasks to team members
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                  <span>Create New</span>
                  <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
              
              <div className="group p-6 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-100 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-600 transition-all card-hover">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/40 mr-4">
                    <Calendar className="text-orange-600 dark:text-orange-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Analytics
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  View detailed analytics and reports (Coming Soon)
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium opacity-50">
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="glass-card rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Clock className="mr-3 text-gray-500" size={24} />
            Recent Tasks
          </h2>
          <div className="space-y-4">
            {stats?.recentTasks?.slice(0, 5).map((task) => (
              <div key={task.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {task.title}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusConfig(task.status).color}`}>
                    {getStatusConfig(task.status).label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {task.description || 'No description'}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.user_name || 'Unassigned'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(task.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/admin/tasks"
            className="block w-full mt-6 py-3 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            View All Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function for status config
function getStatusConfig(status: string) {
  switch (status) {
    case 'TODO':
      return { color: 'status-todo', label: 'To Do' };
    case 'IN_PROGRESS':
      return { color: 'status-inprogress', label: 'In Progress' };
    case 'DONE':
      return { color: 'status-done', label: 'Done' };
    default:
      return { color: 'status-todo', label: 'To Do' };
  }
}