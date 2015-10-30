'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  timeSpanGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  timeSpan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpanText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  timeSpanSelectedText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  chart: {
    flex: 4,
  },
  image: {
    flex: 1,
  },
});
