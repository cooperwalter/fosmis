import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

abstract class Strategy {
  principal: number;

  constructor(principal: number) {
    this.principal = principal;
  }

  public canAct(): boolean {
    return this.principal > 0;
  }

  abstract act(day: MarketDay): Transaction;


  public spend(amount: number): number {
    let spend = 0;
    if (this.principal >= amount) {
      spend = amount;
    } else {
      spend = this.principal;
    }
    this.principal -= spend;
    return spend;
  }
}

export default Strategy;
