import React, { useState } from 'react';

export default function TransactionData({transactions, RUPEE_SYMBOL, deleteTransaction, updateTransaction}) {
    const revreseSortedTransactions = transactions.slice();
    revreseSortedTransactions.reverse();
    var initEditState = {}
    var initDeleteState = {}
    revreseSortedTransactions.forEach(revreseSortedTransaction => {
        initEditState[revreseSortedTransaction._id] = false
        initDeleteState[revreseSortedTransaction._id] = false
    });

    const [editStates, setEditStates] = useState({});
    const [deleteStates, setDeleteStates] = useState({});

    const toggleEditing = (txnId) => {
        setEditStates(prevStates => {
            const newStates = {};
            Object.keys(initEditState).forEach(id => {
              newStates[id] = id === txnId ? !prevStates[id]  : false;
            });
            return newStates;
        });
        updateTransaction(txnId, editStates[txnId]);
    };

    const toggleDeleting = async (txnId) => {
        if (deleteStates[txnId]) await deleteTransaction(txnId);
        setDeleteStates(prevStates => {
            const newStates = {};
            Object.keys(initDeleteState).forEach(id => {
              newStates[id] = id === txnId ? true : false;
            });
            return newStates;
        });
    };

    return (
        <div className='Transactions'>
            {revreseSortedTransactions.length > 0 && revreseSortedTransactions.map((transaction) => (
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
                            <button className='btn-red' style={{marginRight:"5px"} } onClick={() => toggleDeleting(transaction._id)}>{deleteStates[transaction._id] ? "Sure?" : "Delete"}</button>
                            <button className='btn-yellow' style={{ textAlign: "center" }} onClick={() => toggleEditing(transaction._id)}>{editStates[transaction._id] ? "Undo" : "Update"}</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
