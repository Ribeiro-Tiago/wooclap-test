let timeout: number;

export default (callback: Function, duration: number = 500) => {
  clearTimeout(timeout);
  timeout = setTimeout(callback, duration);
};
