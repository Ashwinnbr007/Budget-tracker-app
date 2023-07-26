import React from 'react'

export default function TransactionData({transactions, RUPEE_SYMBOL}) {
    const revreseSortedTransactions = transactions.slice();
    revreseSortedTransactions.reverse();
    return (
        <>
            {revreseSortedTransactions.length > 0 && revreseSortedTransactions.map((transaction, idx) => (
                <div className='Transaction' key={idx}>
                    <div className='Left'>
                        <div className={
                            (transaction.amount > 0 ?
                                "TransactionAmountGreen" : "TransactionAmountRed")}>
                            {RUPEE_SYMBOL + (transaction.amount < 0 ?
                                transaction.amount.replace('-', '') :
                                transaction.amount)}
                        </div>
                    </div>
                    <div className='Right'>
                        <div className='TransactionDetails'>{transaction.description}</div>
                        <div className='TransactionDate'>{transaction.date}</div>
                    </div>
                </div>
            ))}
        </>
  )
}
