import React from 'react'
import ExpenseItem from './ExpenseItem'
import '../css/ExpenseList.css'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({handleDelete, initialExpenses, handleEdit, clearItems}) => {
  return (
    <div>
      <ul className='list'>
        {initialExpenses.map(expense => {
          return (
            <ExpenseItem 
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}  
              handleEdit={handleEdit}  
            />
          )
        })}
      </ul>
      {
        initialExpenses.length > 0 && (
            <button className="btn" onClick={clearItems}>목록 지우기<MdDelete className="btn-icon"/></button>
        )
      }
    </div>
  )
}

export default ExpenseList