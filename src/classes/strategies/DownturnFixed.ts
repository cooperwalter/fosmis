import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

class DownturnFixed extends Strategy {
  private fixedAmount: number;
  private dropPercentage: number;
  private lastPrice: number | null;

  constructor(principal: number, fixedAmount: number, dropPercentage: number) {
    super(principal);
    this.fixedAmount = fixedAmount;
    this.dropPercentage = dropPercentage;
    this.lastPrice = null;
  }

  act(day: MarketDay): Transaction | null {
    const currentPrice = day.price

    if (this.lastPrice !== null) {
      const drop = ((this.lastPrice - currentPrice) / this.lastPrice) * 100;
      if (drop >= this.dropPercentage) {
        const spend = this.spend(this.fixedAmount);
        this.lastPrice = currentPrice; // Update the last price after a transaction
        return new Transaction(day, spend);
      }
    }

    this.lastPrice = currentPrice; // Set the last price if it's the first day or no transaction occurred
    return null;
  }
}

export default DownturnFixed;
