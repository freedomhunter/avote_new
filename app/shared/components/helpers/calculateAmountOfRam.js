import { Decimal } from 'decimal.js';

export default function calculateAmountOfRam(baseBalance, quoteBalance, RIXAmount) {
  const R = baseBalance;
  const C = quoteBalance.plus(RIXAmount);
  const F = 1.0;

  const base = RIXAmount.dividedBy(C).plus(Decimal(1.0));
  const multiplier = Decimal(1.0).minus(Decimal.pow(base, F));

  return Decimal(0).minus(R.times(multiplier));
}
