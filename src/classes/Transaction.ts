/**
 * @module Transaction
 * This module defines the Transaction class, which represents a financial transaction
 * associated with a specific market day and amount.
 */

import MarketDay from "./MarketDay";

/**
 * Represents a financial transaction.
 */
class Transaction {
  /**
   * The market day associated with the transaction.
   * @type {MarketDay}
   */
  public day: MarketDay;

  /**
   * The amount of the transaction.
   * @type {number}
   */
  public amount: number;

  /**
   * Creates an instance of a Transaction.
   * @param {MarketDay} day - The market day associated with the transaction.
   * @param {number} amount - The amount of the transaction.
   */
  constructor(day: MarketDay, amount: number) {
    this.day = day;
    this.amount = amount;
  }
}

export default Transaction;