import React from 'react'

export default function TransactionData({transactions, RUPEE_SYMBOL, deleteTransaction}) {
    const revreseSortedTransactions = transactions.slice();
    revreseSortedTransactions.reverse();

    return (
        <>
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
                        <div className='Right' style={{display: "flex", flexDirection:"column", alignItems:'flex-end', maxWidth:"150px"}}>
                            <div className='TransactionDetails'>{transaction.description}</div>
                            <div className='TransactionDate'>{transaction.date}</div>
                            <button className='btn-red' onClick={() => deleteTransaction(transaction._id)}>Delete</button>
                        </div>
                    </div>
            ))}
        </>
  )
}
