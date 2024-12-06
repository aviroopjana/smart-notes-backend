export const validateQuery = (query: string): boolean => {
    //checks if query contains only alphanumeric characters and spaces
    return /^[a-zA-Z0-9 ]+$/.test(query);
  };
  