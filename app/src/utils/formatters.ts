export const formatDateForInput = (date?: Date) => {
  const addLeadZero = (num: number) => `0${num}`.substr(-2);
  const d = !!date ? new Date(date) : new Date();

  return `${d.getFullYear()}-${addLeadZero(d.getMonth() + 1)}-${addLeadZero(
    d.getDate(),
  )}`;
};
