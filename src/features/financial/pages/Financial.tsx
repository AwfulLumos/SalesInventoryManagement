import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard } from 'lucide-react';
import { transactions, expenses } from '../../../shared/data/mockData';

export default function Financial() {
  const [periodFilter, setPeriodFilter] = useState<'today' | 'week' | 'month'>('today');

  const filterByPeriod = (date: string) => {
    const transactionDate = new Date(date);
    const today = new Date('2026-04-22');
    const diffDays = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

    if (periodFilter === 'today') return diffDays === 0;
    if (periodFilter === 'week') return diffDays <= 7;
    if (periodFilter === 'month') return diffDays <= 30;
    return false;
  };

  const filteredTransactions = transactions.filter(t => filterByPeriod(t.date));
  const filteredExpenses = expenses.filter(e => filterByPeriod(e.date));

  const totalSales = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalSales - totalExpenses;

  const salesByPaymentMethod = {
    cash: filteredTransactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0),
    gcash: filteredTransactions.filter(t => t.paymentMethod === 'gcash').reduce((sum, t) => sum + t.total, 0),
    card: filteredTransactions.filter(t => t.paymentMethod === 'card').reduce((sum, t) => sum + t.total, 0),
  };

  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Financial Overview</h2>
          <p className="text-sm text-muted-foreground">Track your sales, expenses, and profitability</p>
        </div>
        <select
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value as any)}
          className="px-4 py-2 border border-border rounded-lg bg-input-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none"
        >
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-secondary to-primary text-foreground rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-foreground/80">Total Sales</p>
            <TrendingUp size={24} />
          </div>
          <p className="text-3xl font-bold">₱{totalSales.toFixed(2)}</p>
          <p className="text-sm text-foreground/80 mt-1">
            {filteredTransactions.length} transactions
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary to-[#562f00] text-primary-foreground rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-foreground/80">Total Expenses</p>
            <TrendingDown size={24} />
          </div>
          <p className="text-3xl font-bold">₱{totalExpenses.toFixed(2)}</p>
          <p className="text-sm text-primary-foreground/80 mt-1">
            {filteredExpenses.length} expense entries
          </p>
        </div>

        <div className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-secondary to-primary text-foreground' : 'from-primary to-[#562f00] text-primary-foreground'} rounded-lg shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-2">
            <p className={netProfit >= 0 ? 'text-foreground/80' : 'text-primary-foreground/80'}>Net Profit</p>
            <DollarSign size={24} />
          </div>
          <p className="text-3xl font-bold">₱{netProfit.toFixed(2)}</p>
          <p className={netProfit >= 0 ? 'text-foreground/80 mt-1' : 'text-primary-foreground/80 mt-1'}>
            Margin: {totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-4">Sales by Payment Method</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Wallet className="text-primary" size={20} />
                  <span className="font-medium">Cash</span>
                </div>
                <span className="font-bold text-primary">₱{salesByPaymentMethod.cash.toFixed(2)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${totalSales > 0 ? (salesByPaymentMethod.cash / totalSales) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {totalSales > 0 ? ((salesByPaymentMethod.cash / totalSales) * 100).toFixed(1) : 0}% of total sales
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-primary" size={20} />
                  <span className="font-medium">GCash</span>
                </div>
                <span className="font-bold text-primary">₱{salesByPaymentMethod.gcash.toFixed(2)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${totalSales > 0 ? (salesByPaymentMethod.gcash / totalSales) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {totalSales > 0 ? ((salesByPaymentMethod.gcash / totalSales) * 100).toFixed(1) : 0}% of total sales
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-primary" size={20} />
                  <span className="font-medium">Card</span>
                </div>
                <span className="font-bold text-primary">₱{salesByPaymentMethod.card.toFixed(2)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${totalSales > 0 ? (salesByPaymentMethod.card / totalSales) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {totalSales > 0 ? ((salesByPaymentMethod.card / totalSales) * 100).toFixed(1) : 0}% of total sales
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-4">Expenses by Category</h3>
          {Object.keys(expensesByCategory).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{category}</span>
                    <span className="font-bold text-destructive">₱{amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-destructive h-2 rounded-full"
                      style={{ width: `${totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    {totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0}% of total expenses
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground/80 text-center py-8">No expenses for this period</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-3 hover:bg-muted/40">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-semibold text-sm">{transaction.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-bold text-primary">₱{transaction.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{transaction.items.length} items</span>
                    <span className="capitalize px-2 py-1 bg-muted/60 rounded">
                      {transaction.paymentMethod}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground/80 text-center py-8">No transactions for this period</p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-4">Recent Expenses</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <div key={expense.id} className="border rounded-lg p-3 hover:bg-muted/40">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{expense.description}</p>
                      <p className="text-xs text-muted-foreground">{expense.category}</p>
                    </div>
                    <p className="font-bold text-destructive">₱{expense.amount.toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground/80">{expense.date}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground/80 text-center py-8">No expenses for this period</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
