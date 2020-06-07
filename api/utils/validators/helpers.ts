export const isValidNumber = (num: number) => {
  if (isNaN(num)) {
    return false;
  }

  return Number(num) >= 0 ? Number(num) : false;
};

export const isValidDate = (date: Date) => {
  return !isNaN(new Date(date).getTime());
};
