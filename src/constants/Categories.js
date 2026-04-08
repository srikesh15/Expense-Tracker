export const CATEGORIES = [
  { key: 'food',        label: 'Food',        icon: '🍔', color: '#FF6B6B' },
  { key: 'transport',   label: 'Transport',   icon: '🚗', color: '#4ECDC4' },
  { key: 'shopping',    label: 'Shopping',    icon: '🛍️', color: '#45B7D1' },
  { key: 'bills',       label: 'Bills',       icon: '📄', color: '#96CEB4' },
  { key: 'health',      label: 'Health',      icon: '💊', color: '#FFEAA7' },
  { key: 'salary',      label: 'Salary',      icon: '💰', color: '#DDA0DD', type: 'income' },
  { key: 'freelance',   label: 'Freelance',   icon: '💻', color: '#98FB98', type: 'income' },
  { key: 'other',       label: 'Other',       icon: '📦', color: '#D3D3D3' },
];

// Helper to look up by key
export const getCategoryByKey = (key) =>
  CATEGORIES.find((c) => c.key === key) || CATEGORIES.at(-1);



// A single transaction object
// {
//   id: 'uuid-v4',           // unique ID — use uuid library
//   type: 'expense',          // 'expense' | 'income'
//   amount: 450,              // always store as a number (rupees)
//   category: 'food',         // key from constants/categories.js
//   note: 'Dinner at Zepto',  // optional string
//   date: '2025-04-03',       // ISO date string — easy to sort and filter
//   createdAt: 1712150400000, // timestamp for ordering within same day
// }