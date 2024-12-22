/**
 * @module Simulation
 * This module defines the Simulation class, which is responsible for running a simulation
 * of a given scenario using a specified strategy. It tracks the transactions that occur
 * during the simulation.
 */

import Scenario from "./Scenario";
import Strategy from "./strategies/Strategy";
import Transaction from "./Transaction";

/**
 * Class representing a simulation of a scenario with a strategy.
 */
class Simulation {
  scenario: Scenario;
  strategy: Strategy;
  transactions: Array<Transaction>;

  /**
   * Creates an instance of Simulation.
   * @param {Scenario} scenario - The scenario to simulate.
   * @param {Strategy} strategy - The strategy to use in the simulation.
   */
  constructor(scenario: Scenario, strategy: Strategy) {
    this.scenario = scenario;
    this.strategy = strategy;
    this.transactions = [];
  }

  /**
   * Runs the simulation over the specified date range in the scenario.
   * Executes the strategy for each day and records the transactions.
   * @returns {Array<Transaction>} The list of transactions that occurred during the simulation.
   */
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
