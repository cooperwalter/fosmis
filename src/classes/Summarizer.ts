/**
 * @module Summarizer
 * 
 * This module provides a `Summarizer` class that calculates the return on investment
 * based on a list of transactions and market index data. It computes both the 
 * percentage gain and the annualized return.
 */

import Transaction from "./Transaction";
import MarketIndex from "./MarketIndex";
import CapitalGain from "./CapitalGain";

class Summarizer {
  private _principal: number;
  private _transactions: Array<Transaction>;
  private _marketIndex: MarketIndex;

  /**
   * Constructs a Summarizer instance.
   * @param {number} principal - The initial principal amount.
   * @param {Array<Transaction>} transactions - The list of transactions.
   * @param {MarketIndex} marketIndex - The market index data.
   */
  constructor(principal: number, transactions: Array<Transaction>, marketIndex: MarketIndex) {
    this._principal = principal;
    this._transactions = transactions;
    this._marketIndex = marketIndex;
  }

  /**
   * Calculates the return on investment.
   * @returns {Object} An object containing the percentage gain and annualized return.
   * @property {number} percentageGain - The percentage gain on the investment.
   * @property {number} annualizedReturn - The annualized return on the investment.
   * @property {number} numberOfTransactions - The number of transactions made.
   * @property {number} cashLeft - The amount of cash left after all transactions.
   */
  public calculateReturn(): { percentageGain: number, annualizedReturn: number, numberOfTransactions: number, cashLeft: number } {
    // Get the last day of the MarketIndex
    const lastDay = this._marketIndex.lastDay;
    const capitalGains: Array<CapitalGain> = [];
    // For each transaction, get the spend and the market day
    // and calculate the return with the market day's price
    let cashSpent = 0;
    for (const transaction of this._transactions) {
      const { amount, day } = transaction;
      const numShares = amount / day.price;
      const capitalGain = new CapitalGain(amount, numShares * lastDay.price);
      capitalGains.push(capitalGain);
      cashSpent += amount;
    }

    const totalProfit = capitalGains.reduce((acc, curr) => acc + curr.profit(), 0);
    const percentageGain = ((totalProfit / this._principal) * 100).toFixed(2); // Calculate percentage gain

    // Calculate the annualized return
    const startDate = this._transactions[0].day.date; // Assuming transactions are sorted by date
    const endDate = lastDay.date;
    const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25); // Convert milliseconds to years
    const totalReturn = (totalProfit + this._principal) / this._principal;
    const annualizedReturn = ((Math.pow(totalReturn, 1 / years) - 1) * 100).toFixed(2);

    return { percentageGain: parseFloat(percentageGain), annualizedReturn: parseFloat(annualizedReturn), numberOfTransactions: this._transactions.length, cashLeft: this._principal - cashSpent };
  }
}

export default Summarizer;