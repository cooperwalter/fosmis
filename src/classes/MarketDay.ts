class MarketDay {
  private _date: string;
  private _price: number;

  constructor(date: Date, price: number) {
    this._date = date.toISOString().split('T')[0];
    this._price = price;
  }

  public get date() {
    return new Date(this._date);
  }

  public get price() {
    return this._price;
  }
}

export default MarketDay;
