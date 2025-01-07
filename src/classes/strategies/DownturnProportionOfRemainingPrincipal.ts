/**
 * @module DownturnProportional
 * 
 * This module defines the DownturnProportional strategy, which is a type of investment strategy
 * that reacts to market downturns by spending a proportional amount of the principal based on
 * the percentage drop in price. The strategy is designed to capitalize on market dips by 
 * purchasing more when prices fall significantly.
 */

import Strategy from "./Strategy";
import MarketDay from "../MarketDay";
import Transaction from "../Transaction";

/**
 * Class representing a downturn proportional investment strategy. This strategy invests
 * a proportion of the remaining principal based on the percentage drop in price since the last
 * market price.
 * @extends Strategy
 */
class DownturnProportionalOfRemainingPrincipal extends Strategy {
  private dropPercentage: number;
  private lastPrice: number | null;
  private dropSpendMultiplier: number; // multiplier of the drop percentage to spend

  /**
   * Creates an instance of DownturnProportional.
   * 
   * @param {number} principal - The initial amount of money to invest.
   * @param {number} dropPercentage - The percentage drop in price that triggers a transaction.
   * @param {number} dropSpendMultiplier - The multiplier of the drop percentage to determine spending.
   */
  constructor(principal: number, dropPercentage: number, dropSpendMultiplier: number) {
    super(principal);
    this.dropPercentage = dropPercentage;
    this.dropSpendMultiplier = dropSpendMultiplier;
    this.lastPrice = null;
  }

  /**
   * Determines the action to take on a given market day. For the DownturnProportionalOfRemainingPrincipal strategy,
   * the strategy spends a proportional amount of the principal based on the percentage drop in price 
   * since the last market price.
   * @param {MarketDay} day - The market day containing the current price.
   * @returns {Transaction | null} - A transaction if the conditions are met, otherwise null.
   */
  act(day: MarketDay): Transaction | null {
    const currentPrice = day.price;

    if (this.lastPrice !== null) {
      const drop = ((this.lastPrice - currentPrice) / this.lastPrice) * 100;
      if (drop >= this.dropPercentage) {
        const proportionalAmount = (drop / 100) * this.principal;
        const spend = this.spend(proportionalAmount * this.dropSpendMultiplier);
        this.lastPrice = currentPrice; // Update the last price after a transaction
        return new Transaction(day, spend);
      }
    }

    this.lastPrice = currentPrice;
    return null;
  }
}

export default DownturnProportionalOfRemainingPrincipal;
