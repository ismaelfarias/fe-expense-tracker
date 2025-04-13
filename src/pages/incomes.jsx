import React, { useState, useEffect } from 'react';
import './Incomes.css';
import AddButton from '../components/AddButton';
import FormModal from '../components/FormModal';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newIncome, setNewIncome] = useState({ name: '', amount: '', date: '' });
  const [editingIncome, setEditingIncome] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch('http://localhost:8000/incomes/', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch incomes');
        }
        const data = await response.json();
        setIncomes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchIncomes();
  }, []);

  const handleAddIncome = () => {
    setShowForm(true);
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income);
    setNewIncome({ name: income.name, amount: income.amount, date: income.date });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteIncome = async (incomeId) => {
    try {
      const response = await fetch(`http://localhost:8000/incomes/${incomeId}`, {
        method: 'DELETE',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete income');
      }

      setIncomes(incomes.filter(income => income.id !== incomeId));
    } catch (err) {
      console.error('Error deleting income:', err);
      setError(err.message);
    }
  };

  const handleSaveIncome = async () => {
    try {
      if (!newIncome.name.trim() || !newIncome.amount || !newIncome.date) {
        setError('All fields are required');
        return;
      }

      const response = await fetch('http://localhost:8000/incomes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(newIncome),
      });

      if (!response.ok) {
        throw new Error('Failed to save income');
      }

      const savedIncome = await response.json();
      setIncomes(prevIncomes => [...prevIncomes, savedIncome]);
      setNewIncome({ name: '', amount: '', date: '' });
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Error saving income:', err);
      setError(err.message);
    }
  };

  const handleUpdateIncome = async () => {
    try {
      if (!newIncome.name.trim() || !newIncome.amount || !newIncome.date) {
        setError('All fields are required');
        return;
      }

      const response = await fetch(`http://localhost:8000/incomes/${editingIncome.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(newIncome),
      });

      if (!response.ok) {
        throw new Error('Failed to update income');
      }

      const updatedIncome = await response.json();
      setIncomes(prevIncomes => 
        prevIncomes.map(income => income.id === updatedIncome.id ? updatedIncome : income)
      );
      setShowForm(false);
      setNewIncome({ name: '', amount: '', date: '' });
      setEditingIncome(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating income:', err);
      setError(err.message);
    }
  };

  return (
    <div className="incomes-page">
      <h1>Incomes</h1>
      <AddButton onClick={handleAddIncome} label="Add New Income" />
      {error && <p className="error-message">{error}</p>}

      <div className="incomes-container">
        {incomes.map((income) => (
          <div className="income-card" key={income.id}>
            <strong>Name:</strong> {income.name} <br />
            <strong>Amount:</strong> ${income.amount} <br />
            <strong>Date:</strong> {income.date} <br />
            <div className="income-actions">
              <button className="edit-button" onClick={() => handleEditIncome(income)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteIncome(income.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <FormModal
          title={isEditing ? 'Edit Income' : 'Add New Income'}
          onClose={() => {
            setShowForm(false);
            setIsEditing(false);
            setEditingIncome(null);
            setNewIncome({ name: '', amount: '', date: '' });
          }}
          onSave={isEditing ? handleUpdateIncome : handleSaveIncome}
        >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newIncome.name}
              onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={newIncome.date}
              onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
              required
            />
          </div>
        </FormModal>
      )}
    </div>
  );
};

export default Incomes;