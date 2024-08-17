declare global {
  interface Number {
    toDecimal: () => number;
    toBigint: () => number;
    toABNTStandard: () => number;
  }
}

const delta = 1000000;
const decimals = 2;

Number.prototype.toBigint = function (): number {
  return parseFloat((this.valueOf() * delta).toFixed());
};

Number.prototype.toDecimal = function (): number {
  return parseFloat((this.valueOf() / delta).toFixed(6));
};

Number.prototype.toABNTStandard = function (): number {
  let result = this.valueOf();
  const decimalParts = this.valueOf().toString().split('.');
  const subsequent = decimalParts[1];
  const decimalPlaces = ('000000' + 1)
    .slice(-decimals - 1)
    .split('')
    .reverse()
    .join('');

  if (
    subsequent &&
    subsequent.substring(decimals, 3) == '5' &&
    !(parseInt(subsequent.substring(decimals - 1, 2)) % 2) &&
    !subsequent.substring(decimals + 1, subsequent.length)
  ) {
    result =
      Math.trunc(this.valueOf() * parseInt(decimalPlaces)) /
      parseInt(decimalPlaces);
  } else {
    result =
      Math.round(this.valueOf() * parseInt(decimalPlaces)) /
      parseInt(decimalPlaces);
  }

  return result;
};

export {};
