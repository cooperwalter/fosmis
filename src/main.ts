// Fosmis: Finding Optimal Stock Market Investing Strategy

import AllUpfront from "./classes/strategies/AllUpfront";
import DollarCostAveraging from "./classes/strategies/DollarCostAveraging";
import Scenario from "./classes/Scenario";
import Simulation from "./classes/Simulation";
import Summarizer from "./classes/Summarizer";
import { loadIndex, Index } from "./data/data-loader";

const PRINCIPAL = 100000;

async function allUpfront() {
  console.log("****** Fosmis Simulation: All Upfront ******");
  const sAndP500 = await loadIndex(Index.S_AND_P_500);
  const scenario = new Scenario(sAndP500.firstDay.date, sAndP500.lastDay.date, PRINCIPAL, sAndP500);
  const strategy = new AllUpfront(scenario.principal);
  const simulation = new Simulation(scenario, strategy);
  const transactions = simulation.  run();
  const summarizer = new Summarizer(scenario.principal, transactions, sAndP500);
  const { percentageGain, annualizedReturn } = summarizer.calculateReturn();
  console.log("<Results>");
  console.log(`* Percentage return: ${percentageGain}%`);
  console.log(`* Annualized return: ${annualizedReturn}%`);
  console.log("</Results>");
}

async function dollarCostAveraging() {
  console.log("****** Fosmis Simulation: Dollar Cost Averaging ******");
  const sAndP500 = await loadIndex(Index.S_AND_P_500);
  const scenario = new Scenario(
    sAndP500.firstDay.date,
    sAndP500.lastDay.date,
    PRINCIPAL,
    sAndP500
  );
  const strategy = new DollarCostAveraging(scenario.principal, 1000, 14); // every 2 weeks
  const simulation = new Simulation(scenario, strategy);
  const transactions = simulation.run();
  const summarizer = new Summarizer(scenario.principal, transactions, sAndP500);
  const { percentageGain, annualizedReturn } = summarizer.calculateReturn();
  console.log("<Results>");
  console.log(`* Percentage return: ${percentageGain}%`);
  console.log(`* Annualized return: ${annualizedReturn}%`);
  console.log("</Results>");
}

async function main() {
  await allUpfront();
  console.log("");
  await dollarCostAveraging();
}

main();
