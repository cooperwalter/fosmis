class CapitalGain {
  private _basis: number;
  private _realized: number;

  constructor(basis: number, realized: number) {
    this._basis = basis;
    this._realized = realized;
  }

  public profit() {
    return this._realized - this._basis;
  }
}

export default CapitalGain;