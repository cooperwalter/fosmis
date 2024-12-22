/**
 * @module Scenario
 * This module defines the Scenario class, which represents a financial scenario
 * with a specific time frame, principal amount, and associated market index.
 */

import MarketIndex from "./MarketIndex";

/**
 * Represents a financial scenario with a start date, end date, principal amount,
 * and an associated market index.
 */
class Scenario {
  /** The start date of the scenario. */
  public startDate: Date;

  /** The end date of the scenario. */
  public endDate: Date;

  /** The principal amount involved in the scenario. */
  public principal: number;

  /** The market index associated with the scenario. */
  public marketIndex: MarketIndex;

  /**
   * Creates an instance of Scenario.
   * @param {Date} startDate - The start date of the scenario.
   * @param {Date} endDate - The end date of the scenario.
   * @param {number} principal - The principal amount involved in the scenario.
   * @param {MarketIndex} marketIndex - The market index associated with the scenario.
   */
  constructor(startDate: Date, endDate: Date, principal: number, marketIndex: MarketIndex) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.principal = principal;
    this.marketIndex = marketIndex;
  }
}

export default Scenario;