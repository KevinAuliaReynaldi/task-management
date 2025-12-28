// components/TaskForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

interface TaskFormData {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  deadline: string;
  user_id: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface TaskFormProps {
  taskId?: number;
  isEdit?: boolean;
}

export default function TaskForm({ taskId, isEdit = false }: TaskFormProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'TODO',
    deadline: '',
    user_id: '',
  });

  useEffect(() => {
    fetchUsers();
    
    if (isEdit && taskId) {
      fetchTask(taskId);
    }
  }, [taskId, isEdit]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`);
      if (response.ok) {
        const task = await response.json();
        setFormData({
          title: task.title,
          description: task.description || '',
          status: task.status,
          deadline: task.deadline ? task.deadline.split('T')[0] : '',
          user_id: task.user_id.toString(),
        });
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit ? `/api/tasks/${taskId}` : '/api/tasks';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user_id: parseInt(formData.user_id),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save task');
      }

      router.push('/dashboard/admin/tasks');
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-4"
        >
          <span className="mr-2">←</span>
          Back
        </button>
        
        <div className="flex items-center mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mr-4">
            {isEdit ? (
              <span className="text-blue-600 dark:text-blue-400 text-2xl">💾</span>
            ) : (
              <span className="text-green-600 dark:text-green-400 text-2xl">➕</span>
            )}
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            {isEdit ? 'Edit Task' : 'Create New Task'}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-16">
          {isEdit ? 'Update task details and assignment' : 'Create a new task and assign it to a team member'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/40 mr-3">
              <span className="text-red-600 dark:text-red-400 text-xl">✕</span>
            </div>
            <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl shadow-xl p-8 card-hover">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Describe the task details..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select-field"
              >
                <option value="TODO">📝 To Do</option>
                <option value="IN_PROGRESS">⚡ In Progress</option>
                <option value="DONE">✅ Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="user_id" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Assign to User <span className="text-red-500">*</span>
            </label>
            <select
              id="user_id"
              name="user_id"
              required
              value={formData.user_id}
              onChange={handleChange}
              className="select-field"
            >
              <option value="">Select a team member</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  👤 {user.name} • {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>{isEdit ? 'Update Task' : 'Create Task'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}