import { useEffect, useState } from 'react';
import './App.css';

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
      <form onSubmit={e=>AddNewTransaction(e)}>
        <div className='Amount'>
          <input className={amountColor}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={RUPEE_SYMBOL}
            type="number"></input>
        </div>
        <div className='AmountHint'>
            <p className='left'> <mark className='red'>Negative</mark> for debited</p>
            <p className='right'><mark className='green'>Positive</mark> for credited</p>
          </div>
        <div className='Details'>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description of the item"
            type="desc"></input>
          <input
            onChange={(e) => setDate(e.target.value)}
            id='datePicker'
            defaultValue={date}
            type="date"></input>
        </div>
        <button className={amountColor} type='Submit'>
          Add New Transaction
        </button>
      </form>
      <div className='Transactions'>
        {
          transactions.length > 0 && transactions.map((transaction, idx) => (
            <div className='Transaction' key={idx}>
              <div className='Left'>
                <div className={
                  (transaction.amount > 0 ?
                    "TransactionAmountGreen" : "TransactionAmountRed")}>
                  {RUPEE_SYMBOL + (transaction.amount < 0 ?
                    transaction.amount.replace('-', '') :
                    transaction.amount)}</div>
              </div>
              <div className='Right'>
                <div className='TransactionDetails'>{transaction.description}</div>
                <div className='TransactionDate'>{transaction.date}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
