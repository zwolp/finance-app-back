export class FinancialData {
  constructor(private monthlySalary: number, private savings: number, private monthlyExpanses: number){}

  get getSalary(): number {
    return this.monthlySalary;
  };
  get getSavings(): number {
    return this.savings;
  };
  get getExpanses(): number {
    return this.monthlyExpanses;
  }

  get annualSavings(): number {
    return (this.monthlySalary - this.monthlyExpanses) * 12 + this.savings;
  };

  set raise(raise: number) {
    this.monthlySalary = this.monthlySalary + raise;
  };
  set extraMoney(bonus: number) {
    this.savings = this.savings + bonus;
  }
}