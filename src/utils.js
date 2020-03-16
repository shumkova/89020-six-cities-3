const getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
