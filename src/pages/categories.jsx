import { useEffect, useState } from 'react';
import './Categories.css';
import AddButton from '../components/AddButton';
import FormModal from '../components/FormModal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(prevCategories => 
        prevCategories.filter(category => category.id !== categoryId)
      );
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(err.message);
    }
  };

  const handleSaveCategory = async () => {
    try {
      // Validate input before sending
      if (!newCategory.name.trim()) {
        setError('Name is required');
        return;
      }

      const response = await fetch('http://localhost:8000/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save category');
      }

      const savedCategory = await response.json();
      
      // Update the categories list with the new category
      setCategories(prevCategories => [...prevCategories, savedCategory]);
      
      // Reset form and close modal
      setShowForm(false);
      setNewCategory({ name: '', description: '' });
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error saving category:', err);
      setError(err.message || 'Failed to save category');
    }
  };

  const handleUpdateCategory = async () => {
    try {
      if (!newCategory.name.trim()) {
        setError('Name is required');
        return;
      }

      const response = await fetch(`http://localhost:8000/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const updatedCategory = await response.json();
      
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === editingCategory.id ? updatedCategory : category
        )
      );

      setShowForm(false);
      setIsEditing(false);
      setEditingCategory(null);
      setNewCategory({ name: '', description: '' });
      setError(null);
    } catch (err) {
      console.error('Error updating category:', err);
      setError(err.message);
    }
  };

  return (
    <div className="categories-page">
      <h1>Categories</h1>
      <AddButton onClick={() => setShowForm(true)} label="Add New Category" />
      {error && <p className="error-message">{error}</p>}
      
      <div className="categories-container">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <strong>Name:</strong> {category.name} <br />
            <strong>Description:</strong> {category.description || 'No description available'}
            <div className="category-actions">
              <button 
                className="edit-button"
                onClick={() => handleEditCategory(category)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <FormModal
          title={isEditing ? "Edit Category" : "Add New Category"}
          onClose={() => {
            setShowForm(false);
            setIsEditing(false);
            setEditingCategory(null);
            setNewCategory({ name: '', description: '' });
          }}
          onSave={isEditing ? handleUpdateCategory : handleSaveCategory}
        >
          <div className="form-fields">
            <label>
              Name:
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </label>
          </div>
        </FormModal>
      )}
    </div>
  );
};

export default Categories;