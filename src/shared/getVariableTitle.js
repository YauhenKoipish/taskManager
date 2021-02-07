export const getVariableTitle = (isConditions, firstValue, secondValue) => {
  console.log('conditions', isConditions);
  console.log('firstValue', firstValue);
  console.log('secondValue', secondValue);

  return isConditions ? firstValue : secondValue;
};
