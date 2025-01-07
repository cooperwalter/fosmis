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
 * a proportion of the initial principal scaled by the percentage drop in price since
 * the last market price and the dropSpendMultiplier.
 * @extends Strategy
 */
class DownturnProportionalOfInitialPrincipal extends Strategy {
  private fractionOfPrincipalToSpend: number;
  private initialPrincipal: number;
  private dropPercentage: number;
  private lastPrice: number | null;

  /**
   * Creates an instance of DownturnProportional.
   * 
   * @param {number} principal - The initial amount of money to invest.
   * @param {number} fractionOfPrincipalToSpend - The fraction of the initial principal to spend on each transaction.
   * @param {number} dropPercentage - The percentage drop in price that triggers a transaction.
   * @param {number} dropSpendMultiplier - The multiplier of the drop percentage to determine spending.
   */
  constructor(principal: number, fractionOfPrincipalToSpend: number, dropPercentage: number) {
    super(principal);
    this.fractionOfPrincipalToSpend = fractionOfPrincipalToSpend;
    this.initialPrincipal = principal;
    this.dropPercentage = dropPercentage;
    this.lastPrice = null;
  }

  /**
   * Determines the action to take on a given market day. For the DownturnProportionalOfInitialPrincipal strategy,
   * the strategy spends a proportional amount of the initial   principal based on the percentage drop in price 
   * since the last market price.
   * 
   * For example, if the initial principal is $100,000, the fractionOfPrincipalToSpend is 0.1, the dropPercentage is 1%,
   * and the actual drop is 1%, the strategy will spend $100,000 * 0.1 * 0.01 = $1,000 when the price drops by at least 1%.
   * 
   * @param {MarketDay} day - The market day containing the current price.
   * @returns {Transaction | null} - A transaction if the conditions are met, otherwise null.
   */
  act(day: MarketDay): Transaction | null {
    const currentPrice = day.price;

    if (this.lastPrice !== null) {
      const drop = ((this.lastPrice - currentPrice) / this.lastPrice) * 100;
      if (drop >= this.dropPercentage) {
        const proportionalAmount = (drop / 100) * (this.initialPrincipal * this.fractionOfPrincipalToSpend);
        const spend = this.spend(proportionalAmount);
        this.lastPrice = currentPrice; // Update the last price after a transaction
        return new Transaction(day, spend);
      }
    }

    this.lastPrice = currentPrice;
    return null;
  }
}

export default DownturnProportionalOfInitialPrincipal;
