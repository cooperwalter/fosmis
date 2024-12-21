import { loadMarketIndexFromCsv as loadSAndP500 } from "./s&p500/processor";

enum Index {
  S_AND_P_500 = "s&p500",
}

const loadIndex = async (index: Index) => {
  switch (index) {
    case Index.S_AND_P_500:
      return loadSAndP500();
    default:
      throw new Error(`Index ${index} not found`);
  }
};

export { Index, loadIndex };