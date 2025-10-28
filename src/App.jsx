import { useState,useEffect } from 'react';
import ActionAreaCard from './ActionAreaCard';
import { PieChart, Pie, Cell} from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


import Modal from './Modal';
import ModalExpense from './ModalExpense';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState(()=>{
    const stored=localStorage.getItem('expenses');
return stored ? JSON.parse(stored):[];
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    const stored = localStorage.getItem('walletBalance');
    return stored ? Number(stored) : 5000;
  });

  // ✅ NEW STATES for edit
  const [editMode, setEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const handleClick = () => setShowModal(true);
  const handleExpenseClick = () => {
    setEditMode(false); // not editing
    setShowExpenseModal(true);
  };

  useEffect(()=>{
localStorage.setItem('expenses',JSON.stringify(expenses))
localStorage.setItem('walletBalance',walletBalance);
  },[walletBalance,expenses])

  const handleAddExpense = (newExpense) => {
    const expenseAmount = Number(newExpense.price);

    if (expenseAmount > walletBalance) {
      alert('❌ Expense amount cannot be greater than wallet balance!');
      return;
    }

    if (editMode && currentEditIndex !== null) {
      // ✅ EDIT EXISTING EXPENSE
      const updatedExpenses = [...expenses];
      const oldExpense = updatedExpenses[currentEditIndex];
      const balanceDiff = expenseAmount - Number(oldExpense.price);

      // Adjust wallet based on difference
      if (walletBalance - balanceDiff < 0) {
        alert('❌ Not enough wallet balance for this update!');
        return;
      }

      updatedExpenses[currentEditIndex] = newExpense;
      setExpenses(updatedExpenses);

      const newWallet = walletBalance - balanceDiff;
      setWalletBalance(newWallet);
      localStorage.setItem('walletBalance', newWallet);

      setEditMode(false);
      setCurrentEditIndex(null);
    } else {
      // ✅ ADD NEW EXPENSE
      const updatedBalance = walletBalance - expenseAmount;
      setWalletBalance(updatedBalance);
      localStorage.setItem('walletBalance', updatedBalance);
      localStorage.setItem('expenses', JSON.stringify([...expenses,newExpense]))
      setExpenses((prev) => [...prev, newExpense]);
    }

    setShowExpenseModal(false);
  };

  const handleDeleteExpense = (index) => {
    const deleted = expenses[index];
    const refund = Number(deleted.price);
    const newWallet = walletBalance + refund;

    setExpenses((prev) => prev.filter((_, i) => i !== index));
    setWalletBalance(newWallet);
    localStorage.setItem('walletBalance', newWallet);
    localStorage.setItem('expenses', JSON.stringify(expenses))
  };

  // ✅ EDIT BUTTON HANDLER
  const handleEditExpense = (index) => {
    setEditMode(true);
    setCurrentEditIndex(index);
    setShowExpenseModal(true);
  };

  const chartData = expenses.map(exp => ({
  name: exp.category,
  value: Number(exp.price)
}));

const categoryTotals = expenses.reduce((acc, exp) => {
  acc[exp.category] = (acc[exp.category] || 0) + Number(exp.price);
  return acc;
}, {});

const barData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));


  return (
    <>
      <h1 style={{ color: 'white', marginLeft: '10px' }}>Expense Tracker</h1>

      <div
        style={{
          background: '#2e2e2e',
          height: '40vh',
          margin: '10px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
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
  <div style={{ width: '350px', height: '240px', background: 'white', borderRadius: '10px' }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'][index % 5]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

      </div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: '20px',
          padding: '0 10px',
        }}
      >
        <div style={{ width: '74%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ color: 'white', margin: 0 }}>Recent Transactions</h3>
          <div style={{ background: 'white', borderRadius: '10px', padding: '10px' }}>
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
                        onClick={() => handleEditExpense(index)}
                      />
                    </div>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '5px 0' }} />
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ width: '23%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ color: 'white', margin: 0 }}>Top Expenses</h3>
          <div style={{ background: 'white', borderRadius: '10px', height: '250px' }}>
  <div style={{ width: '300px', height: '250px', background: 'white', borderRadius: '10px' }}>
   <ResponsiveContainer width="100%" height="100%">
  <BarChart data={barData} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 40 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="number" />
    <YAxis type="category" dataKey="name" width={80} />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#82ca9d" barSize={5} radius={[10, 10, 10, 10]} />
  </BarChart>
</ResponsiveContainer>

  </div>

            
          </div>
        </div>
      </div>

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

      {showExpenseModal && (
        <ModalExpense
          titleExpense={editMode ? 'Edit Expense' : 'Add Expenses'}
          addExpenseButton={editMode ? 'Save Changes' : 'Add Expense'}
          cancelButton="Cancel"
          onAddExpense={handleAddExpense}
          onCancel={() => setShowExpenseModal(false)}
          walletBalance={walletBalance}
          editData={editMode ? expenses[currentEditIndex] : null} // ✅ Pass existing data
        />
      )}
    </>
  );
}

export default App;