export const sortByObjectKey = (array: [], key: string, descending = false): object[] =>
  array.sort((a: any, b: any) => {
    if (!descending) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });

export default sortByObjectKey;
