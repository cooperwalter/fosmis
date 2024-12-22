/**
 * @module MarketIndex
 * This module defines the MarketIndex class, which represents a collection of MarketDay instances.
 * It provides methods to access and manipulate market days based on specific criteria.
 */

import MarketDay from "./MarketDay";

/**
 * Represents a market index consisting of multiple market days.
 */
class MarketIndex {
  /**
   * An array of MarketDay instances, sorted by date.
   * @private
   * @type {Array<MarketDay>}
   */
  private _days: Array<MarketDay>;

  /**
   * The first market day in the index.
   * @public
   * @type {MarketDay}
   */
  public firstDay: MarketDay;

  /**
   * The last market day in the index.
   * @public
   * @type {MarketDay}
   */
  public lastDay: MarketDay;

  /**
   * Creates an instance of MarketIndex.
   * @param {Array<MarketDay>} days - An array of MarketDay instances to initialize the index.
   */
  constructor(days: Array<MarketDay>) {
    // sort days by date
    this._days = days.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.firstDay = days[0];
    this.lastDay = days[days.length - 1];
  }

  /**
   * Retrieves the market day for a specific date.
   * @param {Date} date - The date for which to retrieve the market day.
   * @returns {MarketDay} The market day corresponding to the specified date.
   * @throws Will throw an error if no market day is found for the given date.
   */
  public getMarketDayAtDate(date: Date): MarketDay {
    const day = this._days.find((day) => day.date === date);
    if (!day) {
      throw new Error(`Day not found for date ${date}`);
    }
    return day;
  }

  /**
   * Retrieves all market days between two dates, inclusive.
   * @param {Date} startDate - The start date of the range.
   * @param {Date} endDate - The end date of the range.
   * @returns {Array<MarketDay>} An array of market days within the specified date range.
   */
  public getDaysBetween(startDate: Date, endDate: Date): Array<MarketDay> {
    // Compare only the YYYY-MM-DD part of the date
    const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    return this._days.filter((day) => day.date >= startDateOnly && day.date <= endDateOnly);
  }

  /**
   * Gets all market days with a valid price.
   * @returns {Array<MarketDay>} An array of market days with a defined and non-zero price.
   */
  public get days() {
    return this._days.filter(
      (day) => day.price !== undefined && day.price !== null && day.price !== 0
    );
  }
}

export default MarketIndex;
