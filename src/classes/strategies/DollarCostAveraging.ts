import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

class DollarCostAveraging extends Strategy {
  private fixedAmount: number;
  private interval: number;
  private counter: number;
  constructor(principal: number, fixedAmount: number, interval: number) {
    super(principal);
    this.fixedAmount = fixedAmount;
    this.interval = interval;
    this.counter = 0;
  }
  act(day: MarketDay): Transaction | null {
    this.counter++;
    if (this.counter === this.interval) {
      const spend = this.spend(this.fixedAmount);
      this.counter = 0;
      return new Transaction(day, spend);
    }
    return null;
  }
}

export default DollarCostAveraging;
