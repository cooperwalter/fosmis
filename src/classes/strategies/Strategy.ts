/**
 * @module Strategy
 * 
 * This module defines the abstract `Strategy` class, which serves as a blueprint for creating
 * specific trading strategies. Each strategy is initialized with a principal amount and can
 * perform actions based on market conditions. The class provides methods to check if actions
 * can be performed and to spend a specified amount from the principal.
 */

import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

/**
 * Abstract class representing a trading strategy.
 * 
 * @abstract
 */
abstract class Strategy {
  /**
   * The principal amount available for the strategy.
   * @type {number}
   */
  principal: number;

  /**
   * Creates an instance of a Strategy.
   * 
   * @param {number} principal - The initial principal amount for the strategy.
   */
  constructor(principal: number) {
    this.principal = principal;
  }

  /**
   * Determines if the strategy can perform an action.
   * 
   * @returns {boolean} True if the principal is greater than zero, otherwise false.
   */
  public canAct(): boolean {
    return this.principal > 0;
  }

  /**
   * Abstract method to perform an action based on the market day.
   * 
   * @abstract
   * @param {MarketDay} day - The market day on which the strategy acts.
   * @returns {Transaction | null} The transaction performed, or null if no action is taken.
   */
  abstract act(day: MarketDay): Transaction | null;

  /**
   * Spends a specified amount from the principal.
   * 
   * @param {number} amount - The amount to spend.
   * @returns {number} The actual amount spent.
   */
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
