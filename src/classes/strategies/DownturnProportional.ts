import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

class DownturnProportional extends Strategy {
  private dropPercentage: number;
  private lastPrice: number | null;
  private dropSpendMultiplier: number; // multiplier of the drop percentage to spend

  constructor(principal: number, dropPercentage: number, dropSpendMultiplier: number) {
    super(principal);
    this.dropPercentage = dropPercentage;
    this.dropSpendMultiplier = dropSpendMultiplier;
    this.lastPrice = null;
  }

  act(day: MarketDay): Transaction | null {
    const currentPrice = day.price;

    if (this.lastPrice !== null) {
      const drop = ((this.lastPrice - currentPrice) / this.lastPrice) * 100;
      if (drop >= this.dropPercentage) {
        const proportionalAmount = (drop / 100) * this.principal;
        const spend = this.spend(proportionalAmount * this.dropSpendMultiplier);
        this.lastPrice = currentPrice; // Update the last price after a transaction
        return new Transaction(day, spend);
      }
    }

    this.lastPrice = currentPrice; // Set the last price if it's the first day or no transaction occurred
    return null;
  }
}

export default DownturnProportional;
