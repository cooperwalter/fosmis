/**
 * @module DollarCostAveraging
 * 
 * This module implements the Dollar Cost Averaging strategy, which is a 
 * systematic investment strategy where a fixed amount of money is invested 
 * at regular intervals, regardless of the asset's price.
 */

import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

/**
 * Class representing a Dollar Cost Averaging investment strategy.
 * @extends Strategy
 */
class DollarCostAveraging extends Strategy {
  private fixedAmount: number;
  private interval: number;
  private counter: number;

  /**
   * Create a Dollar Cost Averaging strategy.
   * @param {number} principal - The initial amount of money to invest.
   * @param {number} fixedAmount - The fixed amount of money to invest at each interval.
   * @param {number} interval - The number of days between each investment.
   */
  constructor(principal: number, fixedAmount: number, interval: number) {
    super(principal);
    this.fixedAmount = fixedAmount;
    this.interval = interval;
    this.counter = 0;
  }

  /**
   * Perform an action on a given market day.
   * @param {MarketDay} day - The current market day.
   * @returns {Transaction | null} - A transaction if the interval is met, otherwise null.
   */
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
