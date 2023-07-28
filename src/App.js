import { useEffect, useState } from 'react';
import './App.css';
import TransactionData from './transactionData/TransactionData';
import FormData from './formData/FormData';
function CreateDate(){
  const dateObject = new Date();
  return dateObject.toISOString().split('T')[0]
}
function App() {
  const RUPEE_SYMBOL = "₹";
  const MONEY_SYMBOL = "💸"
  const UPDATE_TXN = "Update transaction"
  const ADD_TXN = "Add new transaction"
  const url = process.env.REACT_APP_API_URL+'/transaction';
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [buttonMsg, setButtonMsg] = useState(ADD_TXN);
  const [date, setDate] = useState(CreateDate());
  const [isEditing, setIsEditing] = useState(false)
  const [transactions, setTransactions] = useState([]);
  const [editingTxn, setEditingTxn] = useState(null);

  let amountColor = amount === "0" || amount === "" ? "default" : (amount > 0) ? "green" : "red";

  async function deleteTransaction(idx) {
    var deleteUrl = url + "/delete/" + idx;
    try {
      await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
    }
    catch {
      console.log("Cannot delete data from MongoDB")
    }
    return true
  }

  function updateTransaction(idx, _isEditing) {
    const txn = transactions.find(item => item._id === idx);
    if (_isEditing) {
      setEditingTxn([]);
      setAmount('');
      setDescription('');
      setDate(CreateDate());
      setButtonMsg(ADD_TXN);
      setIsEditing(false);
    }
    else {
      setEditingTxn(txn);
      setAmount(txn.amount);
      setDescription(txn.description);
      setDate(txn.date);
      setButtonMsg(UPDATE_TXN);
      setIsEditing(true);
    }
  }

  async function AddNewTransaction(e, idx = null) {
    if (!isEditing) e.preventDefault();
    //Sending a post request to our api endpoint
    try {
      await fetch(isEditing ? url + "/update/" + editingTxn._id : url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          description,
          date
        })
      })
    }
    catch {
      console.log("Cannot fetch data from MongoDB")
    }

    setAmount('');
    setDescription('');
    setDate(CreateDate());
    setIsEditing(false)
  }

  useEffect(() => {
    async function FetchData() {
      const url = process.env.REACT_APP_API_URL+'/transactions';
      const res = await fetch(url);
      return await res.json();
    }
    FetchData().then(transaction => { setTransactions(transaction) });
  }, [transactions])

  let headerString = ""
  let balance = 0
  let hintMessage = ""

  for (const transaction of transactions) {
    balance += parseInt(transaction.amount);
  }
  if (balance === 0) {
    headerString = ""
  } else if (balance < 0) {
    headerString = RUPEE_SYMBOL + balance.toString().replace('-', '');
    hintMessage = "Work on your spending habits! 👎🏻"
  } else {
    headerString = RUPEE_SYMBOL + balance;
    hintMessage = "Your spending habits are looking good, keep it up! 💪🏻"
  }
  
  return (
    <div className='main'>
      <h2 style={{fontStyle:'italic', color:"#ababab", textAlign:'center'}}>
        Personal budget tracker 🕊
      </h2>
      <h1 className={
        (balance > 0 ? "headerGreen" : "headerRed")}>
        {(headerString) || MONEY_SYMBOL } 
      </h1>
      <h4>
        {hintMessage}
      </h4>
      <FormData
        AddNewTransaction={AddNewTransaction}
        amountDetails={
          {
            amountColor,
            amount,
            description,
            date,
            setAmount,
            setDescription,
            setDate,
          }
        }
        RUPEE_SYMBOL={RUPEE_SYMBOL}
        buttonMsg={buttonMsg}
      />
      <TransactionData
        transactions={transactions}
        RUPEE_SYMBOL={RUPEE_SYMBOL}
        deleteTransaction={deleteTransaction}
        updateTransaction={updateTransaction}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
