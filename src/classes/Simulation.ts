import Scenario from "./Scenario";
import Strategy from "./strategies/Strategy";
import Transaction from "./Transaction";

class Simulation {
  scenario: Scenario;
  strategy: Strategy;
  transactions: Array<Transaction>;

  constructor(scenario: Scenario, strategy: Strategy) {
    this.scenario = scenario;
    this.strategy = strategy;
    this.transactions = [];
  }

  public run() {
    const marketIndex = this.scenario.marketIndex;
    const days = marketIndex.getDaysBetween(this.scenario.startDate, this.scenario.endDate);
    for (const day of days) {
      if (this.strategy.canAct()) {
        this.transactions.push(this.strategy.act(day));
      } else {
        break;
      }
    }
    return this.transactions;
  }
}

export default Simulation;
