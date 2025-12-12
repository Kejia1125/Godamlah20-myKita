// balance-context.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from "react"

interface Transaction {
  id: number
  type: "topup" | "payment"
  amount: number
  description?: string
  date: string
}

interface BalanceContextType {
  balance: number
  setBalance: (value: number) => void
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined)

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(1234.56) // default
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction])
    // Update balance automatically if it’s a payment or topup
    setBalance(prev => transaction.type === "payment" ? prev - transaction.amount : prev + transaction.amount)
  }

  return (
    <BalanceContext.Provider value={{ balance, setBalance, transactions, addTransaction }}>
      {children}
    </BalanceContext.Provider>
  )
}

export const useBalance = () => {
  const context = useContext(BalanceContext)
  if (!context) throw new Error("useBalance must be used within BalanceProvider")
  return context
}
