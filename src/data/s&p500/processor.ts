import { readCsvFile } from "../../utils";
import MarketIndex from "../../classes/MarketIndex";
import MarketDay from "../../classes/MarketDay";

const DATA_PATH = `${__dirname}/s&p500.csv`;

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
