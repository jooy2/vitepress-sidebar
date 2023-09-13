export const sortByObjectKey = (arr, key, desc = false) =>
  arr.sort((a, b) => {
    if (!desc) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    }
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });

export default sortByObjectKey;
