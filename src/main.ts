/**
 * Fosmis: Finding Optimal Stock Market Investing Strategy
 * 
 * This module simulates various stock market investment strategies using historical data.
 * It loads the S&P 500 index data and runs simulations for different strategies, 
 * summarizing the results in terms of percentage and annualized returns.
 */

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

/**
 * Runs a simulation for a given investment strategy.
 * 
 * @param {string} strategyName - The name of the investment strategy.
 * @param {any} StrategyClass - The class representing the investment strategy.
 * @param {any[]} strategyArgs - The arguments to initialize the strategy.
 */
async function runSimulation(StrategyClass: any, strategyArgs: any[]) {
  console.log(`****** Fosmis Simulation: ${StrategyClass.name} ******`);

  // Load the S&P 500 index from the data
  const sAndP500 = await loadIndex(Index.S_AND_P_500);
  
  // Create a new scenario with the S&P 500 index
  // const scenario = new Scenario(sAndP500.firstDay.date, sAndP500.lastDay.date, PRINCIPAL, sAndP500);
  const scenario = new Scenario(new Date("2020-01-01"), sAndP500.lastDay.date, PRINCIPAL, sAndP500);
  // const scenario = new Scenario(new Date("2015-01-01"), new Date("2020-01-01"), PRINCIPAL, sAndP500);
  
  // Create a new strategy instance with the scenario and strategy arguments
  const strategy = new StrategyClass(scenario.principal, ...strategyArgs);


  // Run the simulation
  const simulation = new Simulation(scenario, strategy);
  const transactions = simulation.run();

  // Summarize the results
  const summarizer = new Summarizer(scenario.principal, transactions, sAndP500);
  const { percentageGain, annualizedReturn, numberOfTransactions, cashLeft } = summarizer.calculateReturn();
  console.log("<Results>");
  console.log(`* Percentage return: ${percentageGain}%`);
  console.log(`* Annualized return: ${annualizedReturn}%`);
  console.log(`* Number of transactions: ${numberOfTransactions}`);
  console.log(`* Cash left: $${cashLeft.toLocaleString()}`);
  console.log("</Results>");
}

/**
 * Main function to run all simulations.
 * 
 * It initializes the principal amount and runs simulations for each strategy,
 * printing the results to the console.
 */
async function main() {
  console.log("****** Fosmis Simulations ******");
  console.log(`Starting Principal: $${PRINCIPAL.toLocaleString()}`);
  console.log("");
  await runSimulation(AllUpfront, []);
  console.log("");
  await runSimulation(DollarCostAveraging, [1000, 14]); // every 2 weeks
  console.log("");
  await runSimulation(DownturnFixed, [10000, 2]);
  console.log("");
  await runSimulation(DownturnProportional, [2, 10]);
}

main();
