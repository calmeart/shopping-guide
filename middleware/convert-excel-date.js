module.exports = (excelDate) => {
  return new Date((excelDate - (25567 + 2))*86400*1000).toISOString().split('T')[0];
};
