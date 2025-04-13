import React, { useState, useEffect } from 'react';
import './Expenses.css';
import AddButton from '../components/AddButton';
import FormModal from '../components/FormModal';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ 
    name: '', 
    description: '', 
    category: '', 
    amount: '', 
    date: '' 
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:8000/expenses/', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/categories/', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleAddExpense = () => {
    setShowForm(true);
  };

  const handleSaveExpense = async () => {
    try {
      if (!newExpense.name.trim() || !newExpense.amount || !newExpense.date) {
        setError('Name, amount and date are required');
        return;
      }

      const expenseData = {
        name: newExpense.name,
        description: newExpense.description,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        category_id: Number(newExpense.category) || null
      };

      const response = await fetch('http://localhost:8000/expenses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error('Failed to save expense');
      }

      const savedExpense = await response.json();
      setExpenses(prevExpenses => [...prevExpenses, savedExpense]);
      setShowForm(false);
      setNewExpense({ name: '', description: '', category: '', amount: '', date: '' });
      setError(null);
    } catch (err) {
      console.error('Error saving expense:', err);
      setError(err.message);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setNewExpense({ 
      name: expense.name, 
      description: expense.description || '',
      category: expense.category || '',
      amount: expense.amount, 
      date: expense.date 
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateExpense = async () => {
    try {
      if (!newExpense.name.trim() || !newExpense.amount || !newExpense.date) {
        setError('Name, amount and date are required');
        return;
      }

      const expenseData = {
        name: newExpense.name,
        description: newExpense.description,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        category_id: Number(newExpense.category) || null
      };

      const response = await fetch(`http://localhost:8000/expenses/${editingExpense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      const updatedExpense = await response.json();
      setExpenses(prevExpenses => 
        prevExpenses.map(expense => 
          expense.id === editingExpense.id ? updatedExpense : expense
        )
      );
      setShowForm(false);
      setNewExpense({ name: '', description: '', category: '', amount: '', date: '' });
      setEditingExpense(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating expense:', err);
      setError(err.message);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      setExpenses(expenses.filter(expense => expense.id !== expenseId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="expenses-page">
      <h1>Expenses</h1>
      <AddButton onClick={handleAddExpense} label="Add New Expense" />
      {error && <p className="error-message">{error}</p>}

      <div className="expenses-container">
        {expenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <strong>Name:</strong> {expense.name} <br />
            <strong>Amount:</strong> ${expense.amount.toFixed(2)} <br />
            <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()} <br />
            <strong>Category:</strong> {
              categories.find(cat => cat.id === expense.category_id)?.name || 'Uncategorized'
            } <br />
            <div className="expense-actions">
              <button className="edit-button" onClick={() => handleEditExpense(expense)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <FormModal
          title={isEditing ? 'Edit Expense' : 'Add New Expense'}
          onClose={() => {
            setShowForm(false);
            setIsEditing(false);
            setEditingExpense(null);
            setNewExpense({ name: '', description: '', category: '', amount: '', date: '' });
          }}
          onSave={isEditing ? handleUpdateExpense : handleSaveExpense}
        >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              required
            />
          </div>
        </FormModal>
      )}
    </div>
  );
};

export default Expenses;