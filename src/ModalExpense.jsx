import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ModalExpense = ({ titleExpense, addExpenseButton, cancelButton, onAddExpense, onCancel, walletBalance }) => {
  const categories = ['Food', 'Entertainment', 'Travel', 'Utilities', 'Other'];

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpenseClick = () => {
    if (!formData.title || !formData.price || !formData.category || !formData.date) {
      alert('Please fill out all fields.');
      return;
    }

    const price = Number(formData.price);

    // ✅ Validation: expense cannot exceed wallet balance
    if (price > walletBalance) {
      alert(`❌ Not enough balance! Your wallet has only ₹${walletBalance}.`);
      return;
    }

    onAddExpense(formData);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '80vw',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          width: '420px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <h3 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
          {titleExpense}
        </h3>

        {/* Form fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' }}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' }}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' }}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '5px 10px',
            }}
          >
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px' }}
            />
            <CalendarMonthIcon style={{ color: '#888' }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={handleAddExpenseClick}
            style={{
              backgroundColor: 'orange',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {addExpenseButton}
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: '#555',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExpense;
