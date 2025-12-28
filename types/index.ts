// types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    created_at: string;
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    deadline: string | null;
    user_id: number;
    user_name?: string;
    user_email?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface TaskFormData {
    title: string;
    description?: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    deadline?: string;
    user_id?: number;
  }
  
  export interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
  }