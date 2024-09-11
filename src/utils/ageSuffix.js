export const getAgeSuffix = (age) => {
  if (age % 10 === 1 && age % 100 !== 11) {
    return 'год';
  } else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
    return 'года';
  } else {
    return 'лет';
  }
};
