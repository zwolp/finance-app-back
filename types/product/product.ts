export type Product = {
  id: string,
  name: string,
  annualInterestRate: number,
  durationInDays: number,
  minContribution: number,
  maxContribution: number,
  description: string,
}

export type ProductWithoutId = Omit<Product, 'id'>;

export type financeId = { financeId: string };