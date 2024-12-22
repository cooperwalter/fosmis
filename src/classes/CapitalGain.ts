/**
 * @module CapitalGain
 * This module provides a class to calculate capital gains based on the basis and realized values.
 */

class CapitalGain {
  private _basis: number;
  private _realized: number;

  /**
   * Creates an instance of CapitalGain.
   * @param {number} basis - The initial cost of the investment.
   * @param {number} realized - The amount realized from the sale of the investment.
   */
  constructor(basis: number, realized: number) {
    this._basis = basis;
    this._realized = realized;
  }

  /**
   * Calculates the profit from the capital gain.
   * @returns {number} The profit calculated as the difference between realized and basis.
   */
  public profit() {
    return this._realized - this._basis;
  }
}

export default CapitalGain;