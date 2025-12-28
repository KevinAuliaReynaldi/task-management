// components/TaskItem.tsx
'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { Task } from '@/types';
import { 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface TaskItemProps {
  task: Task;
  isAdmin: boolean;
  onStatusChange: (taskId: number, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => void;
  onDelete?: (taskId: number) => void;
  currentUserId?: number;
}

export default function TaskItem({ task, isAdmin, onStatusChange, onDelete, currentUserId }: TaskItemProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'TODO':
        return {
          color: 'status-todo',
          icon: '📝',
          label: 'To Do'
        };
      case 'IN_PROGRESS':
        return {
          color: 'status-inprogress',
          icon: '⚡',
          label: 'In Progress'
        };
      case 'DONE':
        return {
          color: 'status-done',
          icon: '✅',
          label: 'Done'
        };
      default:
        return {
          color: 'status-todo',
          icon: '📝',
          label: 'To Do'
        };
    }
  };

  const getPriorityColor = () => {
    if (!task.deadline) return 'border-gray-200 dark:border-gray-700';
    const deadline = new Date(task.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0 && task.status !== 'DONE') return 'border-red-500 dark:border-red-500';
    if (diffDays <= 2) return 'border-orange-500 dark:border-orange-500';
    if (diffDays <= 5) return 'border-yellow-500 dark:border-yellow-500';
    return 'border-gray-200 dark:border-gray-700';
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'DONE';
  const statusConfig = getStatusConfig(task.status);

  return (
    <div className={`
      glass-card rounded-2xl shadow-md p-6 card-hover
      border-l-4 ${getPriorityColor()}
      animate-fadeIn
    `}>
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {task.title}
              </h3>
              <span className={`status-badge ${statusConfig.color}`}>
                {statusConfig.icon} {statusConfig.label}
              </span>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            {task.deadline && (
              <div className="flex items-center space-x-2 text-sm">
                <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Deadline:</span>
                <span className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {format(new Date(task.deadline), 'MMM dd, yyyy')}
                </span>
                {isOverdue && (
                  <AlertTriangle size={14} className="text-red-500 animate-pulse" />
                )}
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm">
              <Clock size={16} className="text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">Created:</span>
              <span className="text-gray-600 dark:text-gray-400">
                {format(new Date(task.created_at), 'MMM dd, yyyy')}
              </span>
            </div>
            
            {isAdmin && task.user_name && (
              <div className="flex items-center space-x-2 text-sm">
                <User size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Assigned:</span>
                <span className="text-gray-600 dark:text-gray-400">{task.user_name}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section - Actions */}
        <div className="flex flex-col space-y-3 md:w-48">
          {!isAdmin ? (
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Update Status
              </div>
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as any)}
                className="select-field text-sm py-2"
              >
                <option value="TODO">📝 To Do</option>
                <option value="IN_PROGRESS">⚡ In Progress</option>
                <option value="DONE">✅ Done</option>
              </select>
              {task.status === 'DONE' && (
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                  <CheckCircle size={14} className="mr-1" />
                  Completed
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Actions
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/dashboard/admin/tasks/${task.id}/edit`}
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2 text-sm py-2"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </Link>
                {onDelete && (
                  <button
                    onClick={() => onDelete(task.id)}
                    className="btn-danger flex-1 flex items-center justify-center space-x-2 text-sm py-2"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Progress Indicator */}
          {!isAdmin && task.status === 'IN_PROGRESS' && (
            <div className="mt-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Progress
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}