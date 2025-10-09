import React from 'react';

const Modal = ({ show,titleBalance,titleExpense,addExpenseButton,addBalance,incomeButton,cancelButton, onClose, onIncome, onAddBalance }) => {
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

  return (
    <div style={modalStyle}>
      <div>{titleBalance}</div>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button
          style={{ ...buttonStyle, background: 'white' }}
          onClick={onIncome}
        >
          {incomeButton}
        </button>
        <button
          style={{ ...buttonStyle, background: 'yellow' }}
          onClick={onAddBalance}
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
