/**
 * @module AllUpfront
 * This module defines the AllUpfront strategy for market transactions.
 * The strategy involves spending the entire principal amount upfront.
 */

import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

/**
 * Class representing the AllUpfront strategy.
 * @extends Strategy
 */
class AllUpfront extends Strategy {
  /**
   * Create an AllUpfront strategy.
   * @param {number} principal - The initial amount of money to invest.
   */
  constructor(principal: number) {
    super(principal);
  }
  /**
   * Executes the strategy for a given market day. For the AllUpfront strategy,
   * the entire principal is spent on the first day.
   * @param {MarketDay} day - The market day on which to act.
   * @returns {Transaction} The transaction representing the action taken.
   */
  act(day: MarketDay): Transaction {
    const spend = this.spend(this.principal);
    return new Transaction(day, spend);
  }
}

export default AllUpfront;
