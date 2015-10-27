/* @flow */
exports.dynamicSort = function(property: string) : Function {
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

exports.removeObjectfromArray = function(array: Array<Object>, key: string, value: string | number) : Array<Object> {
  return array.filter(function(el) {
    return el[key] !== value;
  });
};

exports.changeObjectinArray = function(array: Array<Object>, key: string, oldValue: string | number, newValue: string | number) : Array<Object> {
  array.forEach(function(item) {
    if (item[key] === oldValue) {
      item[key] = newValue;
    }
  });
  return array;
};
