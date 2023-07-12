import { useEffect, useState } from 'react';
import './App.css';

function CreateDate(){
  const dateObject = new Date();
  return dateObject.toISOString().split('T')[0]

}
function App() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(CreateDate());
  const [transactions, setTransactions] = useState([]);


  let amountColor = amount === "0" || amount === "" ? "default" : (amount > 0) ? "green" : "red";

  async function AddNewTransaction(e) {
    
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    //Sending a post request to our api endpoint
    const res = await fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({amount,description,date})
    })

    setAmount('');
    setDescription('');
    setDate(CreateDate());
    let response = await(res.json())
  }

  useEffect(() => {
    async function FetchData() {
      const url = process.env.REACT_APP_API_URL+'/transactions';
      const res = await fetch(url);
      return await res.json();
    }
    FetchData().then(transaction => { setTransactions(transaction) });
  }, [])

  console.log(transactions)
  
  return (
    <div className='main'>
      <h1>₹100<span>.00</span></h1>
      <form onSubmit={e=>AddNewTransaction(e)}>
        <div className='Amount'>
          <input className={amountColor}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="₹"
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
        <div className='Transaction'>
          <div className='Left'>
            <div className='TransactionAmountRed'>₹500</div>
          </div>
          <div className='Right'>
            <div className='TransactionDetails'>Samsung tv</div>
            <div className='TransactionDate'>05/12/2000</div>
          </div>
        </div>
        <div className='Transaction'>
          <div className='Left'>
            <div className='TransactionAmountGreen'>₹500</div>
          </div>
          <div className='Right'>
            <div className='TransactionDetails'>Samsung tv</div>
            <div className='TransactionDate'>05/12/2000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
