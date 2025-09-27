import { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } from '../lib/employeeDb';
import { Employee } from '../lib/types';

describe('Employee CRUD', () => {
  let employeeId: number;

  it('should create employee', () => {
    const result = createEmployee('Test', 'test@example.com', 'Dev');
    employeeId = result.lastInsertRowid as number;
    expect(employeeId).toBeGreaterThan(0);
  });

  it('should get all employees', () => {
    const employees: Employee[] = getAllEmployees();
    expect(employees.length).toBeGreaterThan(0);
  });

  it('should get single employee', () => {
    const employee: Employee | undefined = getEmployeeById(employeeId);
    expect(employee).toBeDefined();
    expect(employee!.name).toBe('Test');
  });

  it('should update employee', () => {
    updateEmployee(employeeId, 'Updated', 'updated@example.com', 'Lead');
    const employee: Employee | undefined = getEmployeeById(employeeId);
    expect(employee).toBeDefined();
    expect(employee!.name).toBe('Updated');
  });

  it('should delete employee', () => {
    deleteEmployee(employeeId);
    const employee: Employee | undefined = getEmployeeById(employeeId);
    expect(employee).toBeUndefined();
  });
});
