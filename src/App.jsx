import { useState } from 'react';
import ActionAreaCard from './ActionAreaCard';
import Modal from './Modal';
import ModalExpense from './ModalExpense';



import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  // ✅ Wallet balance stored in React state (not just localStorage)
  const [walletBalance, setWalletBalance] = useState(() => {
    const stored = localStorage.getItem('walletBalance');
    return stored ? Number(stored) : 5000;
  });

  const handleClick = () => setShowModal(true);
  const handleExpenseClick = () => setShowExpenseModal(true);

  const handleIncome = () => {
    console.log('Income amount clicked');
    setShowModal(false);
  };

  const handleAddBalance = () => {
    console.log('Add balance clicked');
    setShowModal(false);
  };

  // ✅ When expense added from modal
  const handleAddExpense = (newExpense) => {
    const expenseAmount = Number(newExpense.price);

    // ✅ Check if expense exceeds wallet
    if (expenseAmount > walletBalance) {
      alert('❌ Expense amount cannot be greater than wallet balance!');
      return;
    }

    // ✅ Deduct from wallet balance
    const updatedBalance = walletBalance - expenseAmount;
    setWalletBalance(updatedBalance);
    localStorage.setItem('walletBalance', updatedBalance);

    // ✅ Add expense to list
    setExpenses((prev) => [...prev, newExpense]);
    setShowExpenseModal(false);
  };

  const handleDeleteExpense = (index) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 style={{ color: 'white', marginLeft: '10px' }}>Expense Tracker</h1>

      {/* Wallet and Expenses Cards */}
      <div
        style={{
          background: '#2e2e2e',
          height: '40vh',
          margin: '10px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '20px',
          flexWrap: 'wrap',
          padding: '20px',
        }}
      >
        <ActionAreaCard
          title="Wallet Balance"
          balance={walletBalance}
          color="limegreen"
          butname="+ Add Income"
          buttonColor="green"
          handleClick={handleClick}
        />
        <ActionAreaCard
          title="Expenses"
          balance={expenses.reduce((sum, exp) => sum + Number(exp.price || 0), 0)}
          color="gold"
          butname="+ Add Expenses"
          buttonColor="red"
          handleClick={handleExpenseClick}
        />
      </div>

      {/* Transaction and Expense Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: '20px',
          padding: '0 10px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Side - Recent Transactions */}
        <div
          style={{
            width: '74%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h3 style={{ color: 'white', margin: 0 }}>Recent Transactions</h3>
          <div
            style={{
              background: 'white',
              borderRadius: '10px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
          >
            {expenses.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#777', padding: '20px' }}>
                No expenses yet. Click “+ Add Expenses” to add one.
              </div>
            ) : (
              expenses.map((exp, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <LocalPizzaIcon
                        style={{ background: '#e2e2e2', borderRadius: '50%', padding: '10px' }}
                      />
                      <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                        <div>{exp.title}</div>
                        <div style={{ fontSize: '0.8em', color: '#666' }}>
                          {exp.date} • {exp.category}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ fontWeight: 'bold' }}>₹{exp.price}</div>
                      <HighlightOffRoundedIcon
                        style={{
                          background: 'red',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '25%',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleDeleteExpense(index)}
                      />
                      <ModeEditRoundedIcon
                        style={{
                          background: 'orange',
                          padding: '5px',
                          borderRadius: '25%',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '5px 0' }} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Top Expenses */}
        <div
          style={{
            width: '23%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h3 style={{ color: 'white', margin: 0 }}>Top Expenses</h3>
          <div
            style={{
              background: 'white',
              borderRadius: '10px',
              height: '250px',
              width: '100%',
            }}
          ></div>
        </div>
      </div>

      {/* Modal for Income */}
      {showModal && (
        <Modal
          titleBalance="Add Balance"
          incomeButton="Income Amount"
          cancelButton="Cancel"
          show={showModal}
          onClose={() => setShowModal(false)}
          onIncome={handleIncome}
          onAddBalance={handleAddBalance}
        />
      )}

      {/* ✅ Expense Modal */}
      {showExpenseModal && (
        <ModalExpense
          titleExpense="Add Expenses"
          addExpenseButton="Add Expense"
          cancelButton="Cancel"
          onAddExpense={handleAddExpense}
          onCancel={() => setShowExpenseModal(false)}
          walletBalance={walletBalance} // ✅ passed
        />
      )}
    </>
  );
}

export default App;
