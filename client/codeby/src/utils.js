export const insertDecimal = price => {
  return (parseInt(price) / 100).toFixed(2);
};
