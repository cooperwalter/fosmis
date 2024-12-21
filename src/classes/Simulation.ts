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
        const result = this.strategy.act(day);
        if (result) {
          this.transactions.push(result);
        }
      } else {
        console.log("Strategy finished acting on day", day.date.toLocaleDateString());
        break;
      }
    }
    return this.transactions;
  }
}

export default Simulation;
