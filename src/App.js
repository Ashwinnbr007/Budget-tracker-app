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
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('No description');
  const [date, setDate] = useState(CreateDate());
  const [transactions, setTransactions] = useState([]);

  let amountColor = amount === "0" || amount === "" ? "default" : (amount > 0) ? "green" : "red";

  async function AddNewTransaction(e) {
    
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    //Sending a post request to our api endpoint
    try {
      await fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({amount,description,date})
      })
    }
    catch {
      console.log("Cannot fetch data from MongoDB")
    }

    setAmount('');
    setDescription('');
    setDate(CreateDate());
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
  for (const transaction of transactions) {
    balance += parseInt(transaction.amount);
  }
  if (balance === 0) {
    headerString = ""
  } else if (balance < 0) {
    headerString = RUPEE_SYMBOL + balance.toString().replace('-', '');
  } else {
    headerString = RUPEE_SYMBOL + balance;
  }
  
  return (
    <div className='main'>
      <h1 className={
        (balance > 0 ? "headerGreen" : "headerRed")}>
        {(headerString)}
      </h1>
      <FormData
        AddNewTransaction={AddNewTransaction}
        amountDetails={
          {
            amountColor: amountColor,
            amount: amount,
            description: description,
            date: date,
            setAmount: setAmount,
            setDescription: setDescription,
            setDate: setDate,
          }
        }
        RUPEE_SYMBOL={RUPEE_SYMBOL}
      />
      <div className='Transactions'>
        {
          <TransactionData
            transactions={transactions}
            RUPEE_SYMBOL={RUPEE_SYMBOL}
          />
        }
      </div>
    </div>
  );
}

export default App;
