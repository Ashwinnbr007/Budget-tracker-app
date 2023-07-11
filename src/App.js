import { useState } from 'react';
import './App.css';

function CreateDate(){
  const dateObject = new Date();
  return dateObject.toISOString().split('T')[0]

}
function App() {
  let todaysDate = CreateDate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className='main'>
      <h1>₹100<span>.00</span></h1>
      <form>
        <div className='Amount'>
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder = "₹" type="number"></input>
        </div>
        <div className='AmountHint'>
            <p className='left'> <mark className='red'>Negative</mark> for debited</p>
            <p className='right'><mark className='green'>Positive</mark> for credited</p>
          </div>
        <div className='Details'>
          <input placeholder = "Description of the item" type="desc"></input>
          <input id='datePicker' defaultValue = {todaysDate} type="date"></input>
        </div>
        <button className='red' type='Submit'>
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
