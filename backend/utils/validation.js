export const removeQuotes = (params) => {
  return params?.replace(/["']/g, "");
};
