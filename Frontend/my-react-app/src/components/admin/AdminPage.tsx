import { useEffect, useState } from "react";
import { Badge } from "../Shared/Badge";
import { Button } from "../Shared/Button";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface Question {
  id: string;
  title: string;
  flagged: boolean;
  askedBy: string;
}

export const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Simulate fetching admin data
  useEffect(() => {
    setUsers([
      { id: "u1", name: "Alice", email: "alice@example.com", role: "user" },
      { id: "u2", name: "Bob", email: "bob@example.com", role: "admin" },
    ]);
    setQuestions([
      {
        id: "q1",
        title: "Why is my Node server crashing?",
        flagged: true,
        askedBy: "Alice",
      },
      {
        id: "q2",
        title: "How to connect MongoDB Atlas?",
        flagged: false,
        askedBy: "Tom",
      },
    ]);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>

      {/* Users List */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">
                  <Badge
                    label={u.role}
                    variant={u.role === "admin" ? "info" : "default"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Questions List */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Flagged Questions</h2>
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Asked By</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td className="p-2 border">{q.title}</td>
                <td className="p-2 border">{q.askedBy}</td>
                <td className="p-2 border">
                  <Badge
                    label={q.flagged ? "Flagged" : "Clean"}
                    variant={q.flagged ? "error" : "success"}
                  />
                </td>
                <td className="p-2 border">
                  <Button
                    variant="danger"
                    className="text-xs px-3 py-1"
                    onClick={() => alert(`Deleted question ${q.id}`)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
