// Fosmis: Finding Optimal Stock Market Investing Strategy

import AllUpfront from "./classes/strategies/AllUpfront";
import DollarCostAveraging from "./classes/strategies/DollarCostAveraging";
import DownturnFixed from "./classes/strategies/DownturnFixed";
import Scenario from "./classes/Scenario";
import Simulation from "./classes/Simulation";
import Summarizer from "./classes/Summarizer";
import { loadIndex, Index } from "./data/data-loader";

const PRINCIPAL = 100000;

async function runSimulation(strategyName: string, StrategyClass: any, strategyArgs: any[]) {
  console.log(`****** Fosmis Simulation: ${strategyName} ******`);
  const sAndP500 = await loadIndex(Index.S_AND_P_500);
  const scenario = new Scenario(sAndP500.firstDay.date, sAndP500.lastDay.date, PRINCIPAL, sAndP500);
  const strategy = new StrategyClass(scenario.principal, ...strategyArgs);
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
  console.log("****** Fosmis Simulations ******");
  console.log(`Starting Principal: $${PRINCIPAL.toLocaleString()}`);
  console.log("");
  await runSimulation("All Upfront", AllUpfront, []);
  console.log("");
  await runSimulation("Dollar Cost Averaging", DollarCostAveraging, [1000, 14]); // every 2 weeks
  console.log("");
  await runSimulation("Downturn Fixed", DownturnFixed, [1000, 1]);
}

main();
