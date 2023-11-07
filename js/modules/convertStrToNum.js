export const convertStrToNum = (str) => {
  const noSpaceStr = str.replace(/\s+/g, '').replace(',', '.');
  const num = parseFloat(noSpaceStr);

  if (!isNaN(num) && isFinite(num)) {
    return num;
  } else {
    return false;
  }
};
