import './App.css';

function App() {
  return (
    <div className='main'>
      <h1>₹100<span>.00</span></h1>
      <form>
        <div className='Amount'>
          <input placeholder = "Amount in number" type="number"></input>
        </div>
        <div className='Details'>
          <input placeholder = "Description of the item" type="desc"></input>
          <input type="datetime-local"></input>
        </div>
        <button type='Submit'>
          Add new Transaction
        </button>
      </form>
      <div className='Transactions'>
        <div className='Transaction'>
          <div className='Left'>
            <div className='TransactionAmount'>₹500</div>
          </div>
          <div className='Right'>
            <div className='TransactionDate'>2000-12-05</div>
            <div className='TransactionDetails'>Samsung tv</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
