exports.dynamicSort = function(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  };
};

exports.removeObjectfromArray = function(array, key, value) {
  return array.filter((el) => el[key] !== value);
};

exports.changeObjectinArray = function(array, key, oldValue, newValue) {
  array.forEach((item) => {
    if (item[key] === oldValue) {
      item[key] = newValue;
    }
  });
  return array;
};

exports.moveObjectinArray = function(array, key, step) {
  const index = array.map(item => item.symbol).indexOf(key);
  const value = array[index];
  let newPos = index + step;

  if (newPos < 0) {
    newPos = 0;
  } else if (newPos > array.length) {
    newPos = array.length;
  }

  array.splice(index, 1);
  array.splice(newPos, 0, value);
  return array;
};
