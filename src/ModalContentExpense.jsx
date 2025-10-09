import React, { useState } from 'react';

const ModalContentExpense = ({ titleExpense, addExpenseButton, cancelButton, onAddExpense, onCancel }) => {
  const categories = ['Food', 'Entertainment', 'Travel', 'Utilities', 'Other'];
  
  // State for form inputs (using useState hook)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpenseClick = () => {
    // Basic validation
    if (!formData.title || !formData.price || !formData.category || !formData.date) {
      console.error('Please fill out all fields.');
      return;
    }
    // In a real app, this would submit data
    onAddExpense(formData);
  }

  return (
    <>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">{titleExpense}</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="col-span-1 p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 shadow-sm"
        />
        {/* Price Input */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="col-span-1 p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 shadow-sm"
        />
        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="col-span-1 p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-sky-500 focus:border-sky-500 shadow-sm"
        >
          <option value="" disabled>Select category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Date Picker */}
        <div className="col-span-1 flex items-center p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-sky-500 shadow-sm">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            className="w-full focus:outline-none text-gray-700"
          />
          <CalendarMonthIcon className="text-gray-500 ml-2" />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleAddExpenseClick}
          className="px-6 py-2 rounded-lg bg-amber-500 text-gray-900 font-semibold hover:bg-amber-600 transition shadow-md"
        >
          {addExpenseButton}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition shadow-sm"
        >
          {cancelButton}
        </button>
      </div>
    </>
  );
};

export default ModalContentExpense;