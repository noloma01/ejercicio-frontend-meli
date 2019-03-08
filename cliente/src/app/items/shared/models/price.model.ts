export class Price {
  public currency: string;
  public amount: number;
  public decimals: number;


  constructor(currency?: string, amount?: number, decimals?: number) {
    this.currency = currency;
    this.amount = amount;
    this.decimals = decimals;
  }
}
