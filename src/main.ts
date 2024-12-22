// Fosmis: Finding Optimal Stock Market Investing Strategy

// Strategies
import AllUpfront from "./classes/strategies/AllUpfront";
import DollarCostAveraging from "./classes/strategies/DollarCostAveraging";
import DownturnProportional from "./classes/strategies/DownturnProportional";
import DownturnFixed from "./classes/strategies/DownturnFixed";

// Classes
import Scenario from "./classes/Scenario";
import Simulation from "./classes/Simulation";
import Summarizer from "./classes/Summarizer";
import { loadIndex, Index } from "./data/data-loader";

const PRINCIPAL = 100000;

async function runSimulation(strategyName: string, StrategyClass: any, strategyArgs: any[]) {
  console.log(`****** Fosmis Simulation: ${strategyName} ******`);
  // Load the S&P 500 index from the data
  const sAndP500 = await loadIndex(Index.S_AND_P_500);

  // Create a new scenario with the S&P 500 index
  const scenario = new Scenario(sAndP500.firstDay.date, sAndP500.lastDay.date, PRINCIPAL, sAndP500);

  // Create a new strategy instance with the scenario and strategy arguments
  const strategy = new StrategyClass(scenario.principal, ...strategyArgs);

  // Run the simulation
  const simulation = new Simulation(scenario, strategy);
  const transactions = simulation.run();

  // Summarize the results
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
  await runSimulation("Downturn Fixed", DownturnFixed, [10000, 2]);
  console.log("");
  await runSimulation("Downturn Proportional", DownturnProportional, [2, 10]);
}

main();
