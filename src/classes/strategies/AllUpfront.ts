import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

class AllUpfront extends Strategy {
  act(day: MarketDay): Transaction {
    const spend = this.spend(this.principal);
    return new Transaction(day, spend);
  }
}

export default AllUpfront;
