# Fosmis: Finding Optimal Stock Market Investing Strategy

This project is a simulation of different investment strategies on the S&P 500 index. It uses the data from the S&P 500 index and simulates different investment strategies over a specified period.

## TODO

- [ ] Add data farther into S&P500 history
- [ ] Allow for different market indices
- [ ] Allow for picking best performing *configuration* of a strategy for a given scenario


## Project Structure

- **src/main.ts**: The entry point of the application. It sets up the simulation and outputs the results.
- **src/classes/**: Contains the core classes used in the simulation, such as `Scenario`, `Simulation`, `Summarizer`, and various strategy classes.
- **src/data/**: Contains data processing scripts and loaders for market index data.
- **src/utils.ts**: Utility functions, including CSV file reading.

### Key Classes

- **Summarizer**: Calculates the return on investment based on transactions and market index data.

- **Simulation**: Runs the investment strategy over a specified period.

- **Strategy**: Abstract class defining the structure for investment strategies.

- **AllUpfront**: A strategy that invests all available capital upfront.

## Existing Strategies

- **AllUpfront**: Invests all available capital at once.
- **DollarCostAveraging**: Invests a fixed amount at regular intervals.
- **DownturnFixed**: Invests a fixed amount during market downturns.

## Scripts

- **run**: Executes the main script using `ts-node`.

  ```json:package.json
  startLine: 5
  endLine: 6
  ```

## Dependencies

- **ts-node**: Used to run TypeScript files directly.
- **typescript**: TypeScript language support.
- **csv-parser**: Parses CSV files for market data.

For a complete list of dependencies, refer to the `package.json` file:

## Adding New Investment Strategies

To add a new investment strategy to the Fosmis project, follow these steps:

1. **Create a New Strategy Class:**
   - Navigate to the `src/classes/strategies/` directory.
   - Create a new TypeScript file for your strategy, e.g., `MyNewStrategy.ts`.
   - Extend the `Strategy` abstract class and implement the `act` method.

   ```typescript
   import Strategy from "./Strategy";
   import MarketDay from "../MarketDay";
   import Transaction from "../Transaction";

   class MyNewStrategy extends Strategy {
     act(day: MarketDay): Transaction {
       // Implement your strategy logic here
       const spend = this.spend(this.principal);
       return new Transaction(day, spend);
     }
   }

   export default MyNewStrategy;
   ```

2. **Integrate the New Strategy:**
   - Import your new strategy in `src/main.ts`.
   - Replace the existing strategy with your new strategy when setting up the simulation.

3. **Run the Simulation:**
   - Use the `run` script in `package.json` to execute the simulation with your new strategy.

   ```bash
   npm run run
   ```

By following these steps, you can easily add and test new investment strategies within the Fosmis project.
