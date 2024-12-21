import MarketDay from "./MarketDay";

class MarketIndex {
  private _days: Array<MarketDay>;
  public firstDay: MarketDay;
  public lastDay: MarketDay;

  constructor(days: Array<MarketDay>) {
    // sort days by date
    this._days = days.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.firstDay = days[0];
    this.lastDay = days[days.length - 1];
  }

  public getMarketDayAtDate(date: Date): MarketDay {
    const day = this._days.find((day) => day.date === date);
    if (!day) {
      throw new Error(`Day not found for date ${date}`);
    }
    return day;
  }

  public getDaysBetween(startDate: Date, endDate: Date): Array<MarketDay> {
    // Compare only the YYYY-MM-DD part of the date
    const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    return this._days.filter((day) => day.date >= startDateOnly && day.date <= endDateOnly);
  }

  public get days() {
    return this._days.filter(
      (day) => day.price !== undefined && day.price !== null && day.price !== 0
    );
  }

}

export default MarketIndex;
