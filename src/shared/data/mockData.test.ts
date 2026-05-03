import { describe, expect, it } from 'vitest'

import { customers, products, transactions } from './mockData'

describe('mock data', () => {
  it('has seed data for products, customers, and transactions', () => {
    expect(products.length).toBeGreaterThan(0)
    expect(customers.length).toBeGreaterThan(0)
    expect(transactions.length).toBeGreaterThan(0)
  })
})
