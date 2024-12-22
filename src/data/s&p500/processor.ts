/**
 * Module for processing S&P 500 market index data from a CSV file.
 * This module provides functionality to load market index data and
 * convert it into a structured format using the MarketIndex and MarketDay classes.
 */

import { readCsvFile } from "../../utils";
import MarketIndex from "../../classes/MarketIndex";
import MarketDay from "../../classes/MarketDay";

const DATA_PATH = `${__dirname}/s&p500.csv`;

/**
 * Loads market index data from a CSV file and returns a MarketIndex instance.
 *
 * @param {string} [filePath=DATA_PATH] - The path to the CSV file containing market data.
 * @returns {Promise<MarketIndex>} A promise that resolves to a MarketIndex instance.
 */
async function loadMarketIndexFromCsv(
  filePath: string = DATA_PATH
): Promise<MarketIndex> {
  const data = await readCsvFile(filePath);

  const marketDays = data.map((row) => {
    const date = new Date(row["Date"]);
    const price = parseFloat(row["Close/Last"].replace(/,/g, ""));
    return new MarketDay(date, price);
  });

  return new MarketIndex(marketDays);
}

export { loadMarketIndexFromCsv };
