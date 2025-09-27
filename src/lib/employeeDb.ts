import Database from 'better-sqlite3';
import path from 'path';

import { Employee } from './types';

const db = new Database(path.resolve('./db.sqlite'));

// Ensure table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL
  )
`).run();

// CRUD functions
export const getAllEmployees = (): Employee[] =>
  db.prepare('SELECT * FROM employees').all() as Employee[];

export const getEmployeeById = (id: number): Employee | undefined =>
  db.prepare('SELECT * FROM employees WHERE id = ?').get(id) as Employee | undefined;

export const createEmployee = (name: string, email: string, position: string) =>
  db.prepare('INSERT INTO employees (name, email, position) VALUES (?, ?, ?)').run(name, email, position);

export const updateEmployee = (id: number, name: string, email: string, position: string) =>
  db.prepare('UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?').run(name, email, position, id);

export const deleteEmployee = (id: number) =>
  db.prepare('DELETE FROM employees WHERE id = ?').run(id);
