import MarketIndex from "./MarketIndex";

class Scenario {
  public startDate: Date;
  public endDate: Date;
  public principal: number;
  public marketIndex: MarketIndex;

  constructor(startDate: Date, endDate: Date, principal: number, marketIndex: MarketIndex) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.principal = principal;
    this.marketIndex = marketIndex;
  }
}

export default Scenario;