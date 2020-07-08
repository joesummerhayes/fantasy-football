export const formValudationCheck = (formToCheck: any): boolean => {
  const formEntries: [string, FFType.FormItem][] = Object.entries(formToCheck);

  const validations = formEntries.map((item: [string, FFType.FormItem]) => {
    return item[1].valid;
  });
  const reducer = (acc: boolean, item: boolean): boolean => {
    if (acc && item) {
      return item;
    }
    return false;
  };

  return validations.reduce(reducer, true);
};


export default {};
