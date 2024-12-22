/**
 * @module MarketDay
 * This module defines the MarketDay class, which represents a market day with a specific date and price.
 */

class MarketDay {
  private _date: string;
  private _price: number;

  /**
   * Creates an instance of MarketDay.
   * @param {Date} date - The date of the market day.
   * @param {number} price - The price associated with the market day.
   */
  constructor(date: Date, price: number) {
    this._date = date.toISOString().split('T')[0]; // Saves the date as a YYYY-MM-DD string
    this._price = price;
  }

  /**
   * Gets the date of the market day.
   * @returns {Date} The date of the market day.
   */
  public get date() {
    return new Date(this._date);
  }

  /**
   * Gets the price of the market day.
   * @returns {number} The price of the market day.
   */
  public get price() {
    return this._price;
  }
}

export default MarketDay;
