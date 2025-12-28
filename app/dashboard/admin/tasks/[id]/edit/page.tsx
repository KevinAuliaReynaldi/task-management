// app/dashboard/admin/tasks/[id]/edit/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import TaskForm from '@/components/TaskForm';

export default function EditTaskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const taskId = params.id ? parseInt(params.id as string) : undefined;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (status === 'authenticated' && session.user.role !== 'ADMIN') {
      router.push('/dashboard/user');
    }
  }, [session, status, router]);

  if (status === 'loading' || !taskId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskForm taskId={taskId} isEdit={true} />
    </div>
  );
}