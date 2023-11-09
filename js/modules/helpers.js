export const convertStrToNum = (str) => {
  const noSpaceStr = str.replace(/\s+/g, '').replace(',', '.');
  const num = parseFloat(noSpaceStr);

  if (!isNaN(num) && isFinite(num)) {
    return num;
  } else {
    return false;
  }
};

export const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
};
export const typesOperation = {
  income: "доход",
  expenses: "расход",
};
