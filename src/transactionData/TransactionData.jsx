import React from 'react'

export default function TransactionData({transactions, RUPEE_SYMBOL, deleteTransaction, updateTransaction}) {
    const revreseSortedTransactions = transactions.slice();
    revreseSortedTransactions.reverse();

    return (
        <div className='Transactions'>
            {revreseSortedTransactions.length > 0 && revreseSortedTransactions.map((transaction, idx) => (
                <div className='Transaction' key={transaction._id}>
                        <div className='Left' style={{display:"flex", alignItems:'center'}}>
                            <div className={
                                (transaction.amount > 0 ?
                                    "TransactionAmountGreen" : "TransactionAmountRed")} style={{ textAlign: 'center' }}>
                                {RUPEE_SYMBOL + (transaction.amount < 0 ?
                                    transaction.amount.replace('-', '') :
                                    transaction.amount)}
                            </div>
                        </div>
                        <div className='Right' style={{display: "flex", flexDirection:"column", maxWidth:"150px"}}>
                            <div className='TransactionDetails'>{transaction.description}</div>
                            <div className='TransactionDate'>{transaction.date}</div>
                        <div style={{textAlign:'center'}}>
                                <button className='btn-red' style={{marginRight:"5px"} } onClick={() => deleteTransaction(transaction._id)}>Delete</button>
                                <button className='btn-yellow' style={{textAlign:"center"}} onClick={() => updateTransaction(transaction._id)}>Update</button>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
  )
}
