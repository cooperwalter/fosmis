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

/**
 * Configuration for different investment strategies.
 * 
 * This object maps strategy class names to their respective configuration arrays.
 * Each strategy configuration array contains the parameters required to initialize
 * and execute the strategy during simulations.
 */
const strategyConfigs: { [key: string]: any[] } = {
  // no args, all principal spent on the first day
  [AllUpfront.name]: [
    []
  ],
  // args are (fixedAmount, interval)
  [DollarCostAveraging.name]: [
    [1000, 14] // $1000 every 14 days
  ],
  // args are (fixedAmount, dropPercentage)
  [DownturnFixed.name]: [
    [10000, 2] // $10,000 when the price drops by at least 2%
  ],
  // args are (dropPercentage, dropSpendMultiplier)
  [DownturnProportional.name]: [
    [2, 10] // (drop % * principal * 10) when the price drops by at least 2%
  ]
}

/**
 * Runs a simulation for a given investment strategy and scenario.
 * 
 * @param {any} StrategyClass - The class representing the investment strategy.
 * @param {any[]} strategyArgs - The arguments to initialize the strategy.
 * @param {Scenario} scenario - The scenario to run the simulation on.
 */
async function runSimulation(StrategyClass: any, strategyArgs: any[], scenario: Scenario) {
  console.log(`Arguments: ${strategyArgs.join(", ")}`);

  // Create a new strategy instance with the scenario and strategy arguments
  const strategy = new StrategyClass(scenario.principal, ...strategyArgs);

  // Run the simulation
  const simulation = new Simulation(scenario, strategy);
  const transactions = simulation.run();

  // Assuming the correct property is `scenario.dataIndex` or similar
  const summarizer = new Summarizer(scenario.principal, transactions, scenario.marketIndex);
  const { percentageGain, annualizedReturn, numberOfTransactions, cashLeft } = summarizer.calculateReturn();
  console.log("<Results>");
  console.log(`* Percentage return: ${percentageGain}%`);
  console.log(`* Annualized return: ${annualizedReturn}%`);
  console.log(`* Number of transactions: ${numberOfTransactions}`);
  console.log(`* Cash left: $${cashLeft.toLocaleString()}`);
  console.log("</Results>");
}

/**
 * Runs all simulations for a given strategy class with multiple configurations and scenarios.
 * 
 * @param {any} StrategyClass - The class representing the investment strategy.
 * @param {Array<any[]>} strategyArgArrays - An array of argument arrays for different configurations of the strategy.
 * @param {Scenario[]} scenarios - An array of scenarios to run the simulations on.
 */
async function runAllSimulationsFor(StrategyClass: any, strategyArgArrays: Array<any[]>, scenarios: Scenario[]) {
  for (const scenario of scenarios) {
    console.log(`Scenario: ${scenario.startDate.toISOString()} to ${scenario.endDate.toISOString()}`);
    for (const strategyArgs of strategyArgArrays) {
      await runSimulation(StrategyClass, strategyArgs, scenario);
    }
  }
}

/**
 * Main function to run all simulations.
 * 
 * It initializes the principal amount and runs simulations for each strategy and scenario,
 * printing the results to the console.
 */
async function main() {
  console.log("****** Fosmis Simulations ******");
  console.log("");

  // Load the S&P 500 index from the data
  const sAndP500 = await loadIndex(Index.S_AND_P_500);

  // Define multiple scenarios
  const scenarios = [
    new Scenario(new Date("2020-01-01"), sAndP500.lastDay.date, 100000, sAndP500),
    new Scenario(new Date("2015-01-01"), new Date("2020-01-01"), 100000, sAndP500)
  ];

  for (const scenario of scenarios) {
    console.log(`**** Scenario: ${scenario.startDate.toISOString()} to ${scenario.endDate.toISOString()} ****`);
    console.log(`****** Fosmis Simulations: ${AllUpfront.name} ******`);
    await runAllSimulationsFor(AllUpfront, strategyConfigs[AllUpfront.name], [scenario]);
    console.log("");
    console.log(`****** Fosmis Simulations: ${DollarCostAveraging.name} ******`);
    await runAllSimulationsFor(DollarCostAveraging, strategyConfigs[DollarCostAveraging.name], [scenario]);
    console.log("");
    console.log(`****** Fosmis Simulations: ${DownturnFixed.name} ******`);
    await runAllSimulationsFor(DownturnFixed, strategyConfigs[DownturnFixed.name], [scenario]);
    console.log("");
    console.log(`****** Fosmis Simulations: ${DownturnProportional.name} ******`);
    await runAllSimulationsFor(DownturnProportional, strategyConfigs[DownturnProportional.name], [scenario]);
    console.log("");
  }
}

main();
