import { NextRequest, NextResponse } from 'next/server';
import { getAllEmployees, createEmployee } from '@/lib/employeeDb';

export async function GET() {
  const employees = getAllEmployees();
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  const { name, email, position } = await req.json();
  if (!name || !email || !position) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const result = createEmployee(name, email, position);
  return NextResponse.json({ id: result.lastInsertRowid, name, email, position }, { status: 201 });
}
