import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9C27B0", "#E91E63"];

const ExpenseChart = ({ expenses }) => {
  // Group expenses by category
  const data = expenses.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  return (
    <div className="expense-chart-card w-full h-96 bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Expense Breakdown
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}   // Bigger chart radius
              fill="#8884d8"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`} 
              contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 mt-10">No expenses to display</p>
      )}
    </div>
  );
};

export default ExpenseChart;
