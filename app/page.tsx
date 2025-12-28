// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Task Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A professional task management system with role-based access control.
            Manage tasks efficiently with different user roles and permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
            <p className="text-gray-600">
              Administrators have full control while users can only manage their own tasks.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-green-600 text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Task Management</h3>
            <p className="text-gray-600">
              Create, assign, and track tasks with status updates and deadlines.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-purple-600 text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
            <p className="text-gray-600">
              Built with NextAuth.js, MySQL, and proper security measures.
            </p>
          </div>
        </div>

        <div className="text-center">
          {session ? (
            <div>
              <p className="text-xl text-gray-700 mb-6">
                Welcome back, <span className="font-bold">{session.user.name}</span>!
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href={session.user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl text-gray-700 mb-6">
                Please sign in to access the system
              </p>
              <Link
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Sign In
              </Link>
            </div>
          )}
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2">Demo Credentials:</p>
            <div className="flex flex-col md:flex-row justify-center gap-4 text-sm">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">Admin User</p>
                <p>Email: admin@gmail.com</p>
                <p>Password: admin123</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">Regular User</p>
                <p>Email: user@gmail.com</p>
                <p>Password: user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}