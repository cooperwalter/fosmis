/**
 * Module for loading market index data.
 * 
 * This module provides functionality to load market index data from various sources.
 * Currently, it supports loading the S&P 500 index data from a CSV file.
 */

import { loadMarketIndexFromCsv as loadSAndP500 } from "./s&p500/processor";

/**
 * Enum representing the available market indices.
 * @enum {string}
 */
enum Index {
  S_AND_P_500 = "s&p500",
}

/**
 * Loads the specified market index data.
 * 
 * @param {Index} index - The market index to load.
 * @returns {Promise<any>} A promise that resolves with the market index data.
 * @throws {Error} Throws an error if the specified index is not found.
 */
const loadIndex = async (index: Index) => {
  switch (index) {
    case Index.S_AND_P_500:
      return loadSAndP500();
    default:
      throw new Error(`Index ${index} not found`);
  }
};

export { Index, loadIndex };