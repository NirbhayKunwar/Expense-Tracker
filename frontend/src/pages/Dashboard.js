import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import "../styles/Dashboard.css";

const API_URL = process.env.REACT_APP_API_URL; // <-- Use env variable

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch expenses on component mount
  useEffect(() => {
    if (!token) {
      window.location.href = "/login"; // Redirect if not logged in
      return;
    }

    const fetchExpenses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch expenses");
        }

        setExpenses(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [token]);

  // Add a new expense
  const addExpense = async (expense) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add expense");
      }

      setExpenses((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete expense");
      }

      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Update an expense
  const updateExpense = async (id, newAmount) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: newAmount }),
      });

      const updated = await res.json();

      if (!res.ok) {
        throw new Error(updated.message || "Failed to update expense");
      }

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === id ? updated : exp))
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600">Loading expenses...</p>
      ) : (
        <>
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={deleteExpense}
            onUpdateExpense={updateExpense}
          />
          <div className="mt-8">
            <ExpenseChart expenses={expenses} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
