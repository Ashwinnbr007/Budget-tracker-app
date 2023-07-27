import React from 'react'

export default function FormData({ AddNewTransaction, amountDetails, RUPEE_SYMBOL, buttonMsg}) {
  return (
    <div>
        <form onSubmit={e=>AddNewTransaction(e)}>
            <div className='Amount'>
                <input className={amountDetails.amountColor}
                    value={amountDetails.amount}
                    onChange={e => amountDetails.setAmount(e.target.value)}
                    placeholder={RUPEE_SYMBOL}
                    required
                    type="number"></input>
            </div>
            <div className='AmountHint'>
                <p className='left'> <mark className='red'>Negative</mark> for debited</p>
                <p className='right'><mark className='green'>Positive</mark> for credited</p>
            </div>
            <div className='Details'>
            <input
                value={amountDetails.description}
                onChange={e => amountDetails.setDescription(e.target.value)}
                placeholder="Description"
                maxLength={20}
                type="desc"></input>
            <input
                onChange={(e) => amountDetails.setDate(e.target.value)}
                id='datePicker'
                defaultValue={amountDetails.date}
                max={amountDetails.date}
                type="date"></input>
            </div>
            <button style={{marginTop:"5px"}} className={amountDetails.amountColor} type='Submit'>
                { buttonMsg }
            </button>
        </form>
    </div>
  )
}
