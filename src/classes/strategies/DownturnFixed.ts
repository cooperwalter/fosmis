/**
 * @module DownturnFixed
 * 
 * This module defines the DownturnFixed strategy, which is a type of investment strategy
 * that triggers a transaction when the market price drops by a specified percentage.
 * The strategy spends a fixed amount of the principal when the condition is met.
 */

import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

/**
 * Class representing a downturn fixed strategy.
 * @extends Strategy
 */
class DownturnFixed extends Strategy {
  private fixedAmount: number;
  private dropPercentage: number;
  private lastPrice: number | null;

  /**
   * Create a DownturnFixed strategy.
   * @param {string} name - The name of the strategy.
   * @param {number} principal - The initial amount of money to invest.
   * @param {number} fixedAmount - The fixed amount to spend when the drop condition is met.
   * @param {number} dropPercentage - The percentage drop in price that triggers a transaction.
   */
  constructor(name: string, principal: number, fixedAmount: number, dropPercentage: number) {
    super(name, principal);
    this.fixedAmount = fixedAmount;
    this.dropPercentage = dropPercentage;
    this.lastPrice = null;
  }

  /**
   * Determine the action to take on a given market day. For the DownturnFixed strategy,
   * the strategy spends a fixed amount of the principal when the drop condition is met.
   * @param {MarketDay} day - The market day containing the current price.
   * @returns {Transaction|null} - A transaction if the drop condition is met, otherwise null.
   */
  act(day: MarketDay): Transaction | null {
    const currentPrice = day.price

    if (this.lastPrice !== null) {
      const drop = ((this.lastPrice - currentPrice) / this.lastPrice) * 100;
      if (drop >= this.dropPercentage) {
        const spend = this.spend(this.fixedAmount);
        this.lastPrice = currentPrice; // Update the last price after a transaction
        return new Transaction(day, spend);
      }
    }

    this.lastPrice = currentPrice; // Set the last price if it's the first day or no transaction occurred
    return null;
  }
}

export default DownturnFixed;
