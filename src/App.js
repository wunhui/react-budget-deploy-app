import "./App.css";
import { Alert } from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import React, { useEffect, useState } from "react";
const App = () => {
  // 지출 항목
  const [charge, setCharge] = useState("");
  // 비용
  const [amount, setAmount] = useState(0)
  // 총 지출
  const [total, setTotal] = useState(0)
  // alert
  const [alert, setAlert] = useState({show: false})

  const [id, setId] = useState()
  const [edit, setEdit] = useState(false)
  // 총 지출 이벤트
  useEffect(() => {
    const newAmount = expenses.map(expense => expense.amount)
    const result = newAmount.reduce(function add(sum, currValue) {
      return sum + currValue
    }, 0)
    setTotal(result.toLocaleString())
  })
  const clearItems = () => {
    setExpenses([])
  }
  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id)
    const { charge, amount } = expense
    setId(id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text})
    setTimeout(() => {
      setAlert({show: false})
    }, 7000)
  }
  const handleChage = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(charge !== "" && amount > 0) {
      if(edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        }) 
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: "success", text: '아이템이 수정되었습니다.'})
      } else {
        const newExpense = {id: crypto.randomUUID(), charge, amount}
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        handleAlert({type: "success", text: '아이템이 생성되었습니다.'})
      }
      setCharge("")
      setAmount(0)
    } else {
      console.log('error')
      handleAlert({type: "danger", text: 'charge는 빈 값일 수 없으면 amount는 0보다 커야합니다.'})
    }
  }
  const [expenses, setExpenses] = useState([
      {
        id: 1,
        charge: '렌트비',
        amount: 1600
      },
      {
        id: 2,
        charge: '교통비',
        amount: 400
      },
      {
        id: 3,
        charge: '식비',
        amount: 1200
      }
  ]);
  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpense)
    handleAlert({type: "danger", text: '아이템이 삭제되었습니다.'})
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{width: '100%', backgroundColor: 'white', padding: '10px'}}>
        <ExpenseForm handleSubmit={handleSubmit} amount={amount} handleAmount={handleAmount} charge={charge} handleChage={handleChage} edit={edit} />
      </div>
      <div style={{width: '100%', backgroundColor: 'white', padding: '10px'}}>
        <ExpenseList clearItems={clearItems} handleDelete={handleDelete} initialExpenses={expenses} handleEdit={handleEdit} />
      </div>

      <div style={{display: 'flex', justifyContent: 'end', marginTop: '10px'}}>
        <p style={{fontSize: '20px'}}>
          총 지출: {total}원
        </p>
      </div>
    </main>
  )
}

export default App;