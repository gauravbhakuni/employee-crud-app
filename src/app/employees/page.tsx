"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // search
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  // modal state
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const uniquePositions = Array.from(new Set(employees.map((e) => e.position)));

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditing(null);
    setName("");
    setEmail("");
    setPosition("");
    setShowForm(true);
  };

  const openEditForm = (emp: Employee) => {
    setEditing(emp);
    setName(emp.name);
    setEmail(emp.email);
    setPosition(emp.position);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`/api/employees/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, position }),
        });
      } else {
        await fetch("/api/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, position }),
        });
      }
      setShowForm(false);
      setEditing(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // filter employees by name
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition =
      positionFilter === "" || emp.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  if (loading) return <p className="p-4 text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <button
          onClick={openNewForm}
          className="px-3 py-2 text-sm rounded bg-primary text-primary-foreground hover:opacity-90"
        >
          + New Employee
        </button>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border border-input rounded px-3 py-2 bg-background"
        />

        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="border border-input rounded px-3 py-2 bg-background"
        >
          <option value="">All Positions</option>
          {uniquePositions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Employee" : "Add Employee"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-input rounded px-3 py-2 bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-input rounded px-3 py-2 bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Position</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full border border-input rounded px-3 py-2 bg-background"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-3 py-2 text-sm rounded bg-muted text-muted-foreground hover:opacity-90"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm rounded bg-primary text-primary-foreground hover:opacity-90"
                >
                  {editing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <div className="overflow-x-auto shadow">
        <table className="w-full border border-border bg-card">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-muted-foreground"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-t hover:bg-muted/50">
                  <td className="px-4 py-2">{emp.id}</td>
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.position}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openEditForm(emp)}
                      className="px-2 py-1 text-sm rounded bg-primary text-primary-foreground hover:opacity-90 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="px-2 py-1 text-sm rounded bg-destructive text-destructive-foreground hover:opacity-90"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
