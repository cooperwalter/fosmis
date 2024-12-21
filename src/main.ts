// Fosmis: Finding Optimal Stock Market Investing Strategy

import AllUpfront from "./classes/strategies/AllUpfront";
import Scenario from "./classes/Scenario";
import Simulation from "./classes/Simulation";
import Summarizer from "./classes/Summarizer";
import { loadIndex, Index } from "./data/data-loader";

async function main() {
  console.log("****** Fosmis Simluation ******");
  const sAndP500 = await loadIndex(Index.S_AND_P_500);
  const scenario = new Scenario(sAndP500.firstDay.date, sAndP500.lastDay.date, 1000, sAndP500);
  const strategy = new AllUpfront(scenario.principal);
  const simulation = new Simulation(scenario, strategy);
  const transactions = simulation.run();
  const summarizer = new Summarizer(scenario.principal, transactions, sAndP500);
  const { percentageGain, annualizedReturn } = summarizer.calculateReturn();
  console.log("<Results>");
  console.log(`* Percentage return: ${percentageGain}%`);
  console.log(`* Annualized return: ${annualizedReturn}%`);
  console.log("</Results>");
}

main();
