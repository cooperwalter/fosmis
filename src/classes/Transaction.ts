import MarketDay from "./MarketDay";

class Transaction {
  public day: MarketDay;
  public amount: number;

  constructor(day: MarketDay, amount: number) {
    this.day = day;
    this.amount = amount;
  }
}

export default Transaction;