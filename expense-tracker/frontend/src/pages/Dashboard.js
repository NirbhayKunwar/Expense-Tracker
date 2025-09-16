import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    fetch("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  }, [token]);

  const addExpense = async (expense) => {
    const res = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expense),
    });
    const data = await res.json();
    setExpenses(prev => [...prev, data]);
  };

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(prev => prev.filter(exp => exp._id !== id));
  };

  const updateExpense = async (id, newAmount) => {
    const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: newAmount }),
    });
    const updated = await res.json();
    setExpenses(prev => prev.map(exp => exp._id === id ? updated : exp));
  };

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

      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        onUpdateExpense={updateExpense}
      />

      <div className="mt-8">
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;
