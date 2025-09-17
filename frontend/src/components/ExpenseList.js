import React from "react";

const ExpenseList = ({ expenses, onDeleteExpense, onUpdateExpense }) => {
  const handleAmountChange = (id, newAmount) => {
    onUpdateExpense(id, parseFloat(newAmount) || 0);
  };

  return (
    <div className="expense-list-card bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Expense List
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses added yet</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="expense-item flex justify-between items-center p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              <div>
                <p className="font-medium text-lg">{expense.title}</p>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={expense.amount}
                  onChange={(e) => handleAmountChange(expense._id, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-28 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => onDeleteExpense(expense._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
