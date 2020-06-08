export const sanitizer = (input?: string) => {
  return input ? input.trim() : "";
};
