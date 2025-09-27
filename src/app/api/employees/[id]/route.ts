import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeById, updateEmployee, deleteEmployee } from '@/lib/employeeDb';

export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop());
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const employee = getEmployeeById(id);
  if (!employee) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });

  return NextResponse.json(employee);
}

export async function PUT(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop());
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const { name, email, position } = await req.json();
  if (!name || !email || !position) return NextResponse.json({ error: 'All fields required' }, { status: 400 });

  updateEmployee(id, name, email, position);
  return NextResponse.json({ id, name, email, position });
}

export async function DELETE(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop());
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  deleteEmployee(id);
  return NextResponse.json({ message: 'Employee deleted' });
}
