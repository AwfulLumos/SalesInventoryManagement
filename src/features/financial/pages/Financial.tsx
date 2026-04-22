import { useState, useEffect, useRef } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard, Smartphone } from 'lucide-react';
import { transactions, expenses } from '../../../shared/data/mockData';

/** Animates a number from 0 → target whenever `target` changes */
function useCountUp(target: number) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const from = 0;
    const duration = 750;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(from + (target - from) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return display;
}

/** Formats a date string as "Apr 22, 2026 · 3:00 PM" */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' · '
    + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

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

  // Animated values
  const animSales = useCountUp(totalSales);
  const animExpenses = useCountUp(totalExpenses);
  const animProfit = useCountUp(Math.abs(netProfit));

  const salesByPaymentMethod = {
    cash: filteredTransactions.filter(t => t.paymentMethod === 'cash').reduce((s, t) => s + t.total, 0),
    gcash: filteredTransactions.filter(t => t.paymentMethod === 'gcash').reduce((s, t) => s + t.total, 0),
    card: filteredTransactions.filter(t => t.paymentMethod === 'card').reduce((s, t) => s + t.total, 0),
  };

  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Summary card variants — unified style using brand palette
  const cardVariants = {
    sales: {
      wrapper: 'bg-gradient-to-br from-[#ffce99] to-[#ff9644]',
      text: 'text-[#562f00]',
      sub: 'text-[#562f00]/70',
      icon: <TrendingUp size={24} />,
    },
    expenses: {
      wrapper: 'bg-gradient-to-br from-[#ff9644] to-[#562f00]',
      text: 'text-[#fffdf1]',
      sub: 'text-[#fffdf1]/70',
      icon: <TrendingDown size={24} />,
    },
    profit: {
      wrapper: netProfit >= 0
        ? 'bg-gradient-to-br from-[#d4f5d8] to-[#7ec98a]'
        : 'bg-gradient-to-br from-[#ff9644] to-[#562f00]',
      text: netProfit >= 0 ? 'text-[#1a4d22]' : 'text-[#fffdf1]',
      sub: netProfit >= 0 ? 'text-[#1a4d22]/70' : 'text-[#fffdf1]/70',
      icon: <DollarSign size={24} />,
    },
  };

  const ProgressBar = ({
    value, total, colorClass,
  }: { value: number; total: number; colorClass: string }) => {
    const pct = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${colorClass} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground/80 w-10 text-right">{pct.toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* Header + period filter */}
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

      {/* Summary cards — unified style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Sales */}
        <div className={`${cardVariants.sales.wrapper} ${cardVariants.sales.text} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`font-medium ${cardVariants.sales.sub}`}>Total Sales</p>
            {cardVariants.sales.icon}
          </div>
          <p className="text-3xl font-bold tabular-nums">₱{animSales.toFixed(2)}</p>
          <p className={`text-sm mt-1 ${cardVariants.sales.sub}`}>{filteredTransactions.length} transactions</p>
        </div>

        {/* Total Expenses */}
        <div className={`${cardVariants.expenses.wrapper} ${cardVariants.expenses.text} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`font-medium ${cardVariants.expenses.sub}`}>Total Expenses</p>
            {cardVariants.expenses.icon}
          </div>
          <p className="text-3xl font-bold tabular-nums">₱{animExpenses.toFixed(2)}</p>
          <p className={`text-sm mt-1 ${cardVariants.expenses.sub}`}>{filteredExpenses.length} expense entries</p>
        </div>

        {/* Net Profit — green if positive, dark if negative */}
        <div className={`${cardVariants.profit.wrapper} ${cardVariants.profit.text} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`font-medium ${cardVariants.profit.sub}`}>Net Profit</p>
            {cardVariants.profit.icon}
          </div>
          <p className="text-3xl font-bold tabular-nums">
            {netProfit < 0 ? '-' : ''}₱{animProfit.toFixed(2)}
          </p>
          <p className={`text-sm mt-1 ${cardVariants.profit.sub}`}>
            Margin: {totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      {/* Payment method & expenses breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sales by payment method */}
        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-5">Sales by Payment Method</h3>
          <div className="space-y-5">
            {[
              { label: 'Cash', value: salesByPaymentMethod.cash, icon: <Wallet size={18} className="text-primary" />, barColor: 'from-primary to-secondary' },
              { label: 'GCash', value: salesByPaymentMethod.gcash, icon: <Smartphone size={18} style={{ color: '#007AFF' }} />, barColor: 'from-blue-400 to-blue-600' },
              { label: 'Card', value: salesByPaymentMethod.card, icon: <CreditCard size={18} className="text-primary" />, barColor: 'from-secondary to-primary' },
            ].map(({ label, value, icon, barColor }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-medium text-sm">{label}</span>
                  </div>
                  <span className="font-bold text-sm text-primary">₱{value.toFixed(2)}</span>
                </div>
                <ProgressBar value={value} total={totalSales} colorClass={barColor} />
              </div>
            ))}
          </div>
        </div>

        {/* Expenses by category */}
        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-5">Expenses by Category</h3>
          {Object.keys(expensesByCategory).length > 0 ? (
            <div className="space-y-5">
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-medium text-sm">{category}</span>
                    <span className="font-bold text-sm text-destructive">₱{amount.toFixed(2)}</span>
                  </div>
                  <ProgressBar value={amount} total={totalExpenses} colorClass="from-[#ff9644] to-[#562f00]" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground/80 text-center py-8">No expenses for this period</p>
          )}
        </div>
      </div>

      {/* Recent transactions & expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent transactions */}
        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-3 hover:bg-muted/40 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-semibold text-sm">{transaction.id}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                    </div>
                    <p className="font-bold text-primary text-sm">₱{transaction.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                    <span>{transaction.items.length} items</span>
                    <span className="capitalize px-2 py-0.5 bg-muted/60 rounded-full font-medium">
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

        {/* Recent expenses */}
        <div className="bg-card rounded-lg shadow p-6 border border-border/60">
          <h3 className="font-semibold text-lg mb-4">Recent Expenses</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <div key={expense.id} className="border rounded-lg p-3 hover:bg-muted/40 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="font-semibold text-sm truncate">{expense.description}</p>
                      <p className="text-xs text-muted-foreground">{expense.category}</p>
                    </div>
                    <p className="font-bold text-destructive text-sm flex-shrink-0">₱{expense.amount.toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground/70">{formatDate(expense.date)}</p>
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
