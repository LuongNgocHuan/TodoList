export const isValidNumber = (num: number | string) => {
    return !Number.isNaN(Number(num));
  };