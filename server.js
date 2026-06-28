const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let budgets = [
  { id: 1, name: 'Housing', spent: 0, limit: 1800, category: 'Rent, utilities, insurance' },
  { id: 2, name: 'Food & Drink', spent: 0, limit: 600, category: 'Groceries, dining out' },
  { id: 3, name: 'Entertainment', spent: 0, limit: 300, category: 'Streaming, events' },
  { id: 4, name: 'Transport', spent: 0, limit: 450, category: 'Fuel, public transit' }
];

let transactions = [];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/reports.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reports.html'));
});

// CRUD - Read all
app.get('/api/budgets', (req, res) => {
  res.json(budgets);
});

// CRUD - Read one
app.get('/api/budgets/:id', (req, res) => {
  const budget = budgets.find(b => b.id === parseInt(req.params.id));
  if (!budget) return res.status(404).json({ message: 'Budget not found' });
  res.json(budget);
});

// CRUD - Create
app.post('/api/budgets', (req, res) => {
  const { name, spent, limit, category } = req.body;
  const newBudget = {
    id: budgets.length + 1,
    name,
    spent: spent || 0,
    limit: limit || 0,
    category: category || ''
  };
  budgets.push(newBudget);
  res.status(201).json(newBudget);
});

// CRUD - Update
app.put('/api/budgets/:id', (req, res) => {
  const budget = budgets.find(b => b.id === parseInt(req.params.id));
  if (!budget) return res.status(404).json({ message: 'Budget not found' });
  
  const { name, spent, limit, category } = req.body;
  budget.name = name || budget.name;
  budget.spent = spent !== undefined ? spent : budget.spent;
  budget.limit = limit !== undefined ? limit : budget.limit;
  budget.category = category || budget.category;
  
  res.json(budget);
});

// CRUD - Delete
app.delete('/api/budgets/:id', (req, res) => {
  const idx = budgets.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Budget not found' });
  
  budgets.splice(idx, 1);
  res.status(204).send();
});

// CRUD - Transactions Read all
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// CRUD - Transactions Read one
app.get('/api/transactions/:id', (req, res) => {
  const txn = transactions.find(t => t.id === parseInt(req.params.id));
  if (!txn) return res.status(404).json({ message: 'Transaction not found' });
  res.json(txn);
});

// CRUD - Transactions Create
app.post('/api/transactions', (req, res) => {
  const { date, category, description, amount, status } = req.body;
  const newTxn = {
    id: transactions.length + 1,
    date: date || new Date().toISOString().split('T')[0],
    category: category || 'Uncategorized',
    description: description || '',
    amount: amount || 0,
    status: status || 'completed'
  };
  transactions.push(newTxn);
  res.status(201).json(newTxn);
});

// CRUD - Transactions Update
app.put('/api/transactions/:id', (req, res) => {
  const txn = transactions.find(t => t.id === parseInt(req.params.id));
  if (!txn) return res.status(404).json({ message: 'Transaction not found' });
  
  const { date, category, description, amount, status } = req.body;
  txn.date = date || txn.date;
  txn.category = category || txn.category;
  txn.description = description || txn.description;
  txn.amount = amount !== undefined ? amount : txn.amount;
  txn.status = status || txn.status;
  
  res.json(txn);
});

// CRUD - Transactions Delete
app.delete('/api/transactions/:id', (req, res) => {
  const idx = transactions.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Transaction not found' });
  
  transactions.splice(idx, 1);
  res.status(204).send();
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  res.json({
    totalNetWorth: totalIncome - totalExpenses,
    monthlyIncome: totalIncome,
    monthlyExpenses: totalExpenses,
    savingsGoal: { name: 'New Car Fund', current: 0, target: 25000 }
  });
});

let users = [];

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return res.json({ success: true, message: 'Login successful', token: 'auth-token-' + Date.now(), user: { name: user.name, email: user.email } });
  }
  res.status(401).json({ message: 'Invalid email or password' });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json({ success: true, message: 'Account created successfully', user: { name, email } });
});

// Profile update endpoint
app.put('/api/auth/profile', (req, res) => {
  const { email, name, phone } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.name = name || user.name;
  user.phone = phone || user.phone;
  res.json({ success: true, message: 'Profile updated successfully', user: { name: user.name, email: user.email, phone: user.phone } });
});

app.listen(PORT, () => {
  console.log(`BlueLedger server running on http://localhost:${PORT}`);
});