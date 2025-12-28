// app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let tasks;
    
    if (session.user.role === "ADMIN") {
      if (userId) {
        // Admin viewing specific user's tasks
        tasks = await query<any[]>(`
          SELECT t.*, u.name as user_name, u.email as user_email 
          FROM tasks t 
          LEFT JOIN users u ON t.user_id = u.id 
          WHERE t.user_id = ?
          ORDER BY t.created_at DESC
        `, [userId]);
      } else {
        // Admin viewing all tasks
        tasks = await query<any[]>(`
          SELECT t.*, u.name as user_name, u.email as user_email 
          FROM tasks t 
          LEFT JOIN users u ON t.user_id = u.id 
          ORDER BY t.created_at DESC
        `);
      }
    } else {
      // User viewing own tasks only
      tasks = await query<any[]>(`
        SELECT t.*, u.name as user_name, u.email as user_email 
        FROM tasks t 
        LEFT JOIN users u ON t.user_id = u.id 
        WHERE t.user_id = ?
        ORDER BY t.created_at DESC
      `, [session.user.id]);
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, status, deadline, user_id } = body;

    // Validation
    if (!title || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const users = await query<any[]>(
      "SELECT id FROM users WHERE id = ?",
      [user_id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Insert task
    const result = await query<any>(
      "INSERT INTO tasks (title, description, status, deadline, user_id) VALUES (?, ?, ?, ?, ?)",
      [title, description || null, status || "TODO", deadline || null, user_id]
    );

    return NextResponse.json(
      { message: "Task created successfully", taskId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}