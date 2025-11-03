import React, { useState } from 'react';

const Modal = ({
  show,
  titleBalance,
  titleExpense,
  addExpenseButton,
  addBalance,
  incomeButton,
  cancelButton,
  onClose,
  onIncome,
  onAddBalance
}) => {
  const [amount, setAmount] = useState("");

  if (!show) return null;

  const modalStyle = {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    position: 'absolute',
    top: '220px',
    height: '80px',
    width: '300px',
    borderRadius: '10px',
    left: '20%',
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '20px',
    justifyContent: 'center',
    color: 'red',
    marginTop: '20px',
    fontSize: '1.5em',
  };

  const buttonStyle = {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
  };

  // ✅ same add balance logic
  const handleAddBalance = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    onAddBalance(Number(amount)); // pass amount to parent
    setAmount("");
    onClose();
  };

  return (
    <div style={modalStyle}>
      <div>{titleBalance}</div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {/* ✅ replaced "Income Amount" button with input box */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid gray',
            width: '90px',
          }}
        />

        <button type='submit'
          style={{ ...buttonStyle, background: 'yellow' }}
          onClick={handleAddBalance}
        >
          Add Balance
        </button>

        <button
          style={{ ...buttonStyle, background: '#5e5e5e' }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
