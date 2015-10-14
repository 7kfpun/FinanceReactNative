'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBlock: {
    flex: 10
  },
  bottomBlock: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  button: {
    height: 36,
    borderColor: '#66CCFF',
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonSelected: {
    backgroundColor: '#66CCFF',
    height: 36,
    borderColor: '#66CCFF',
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: '#66CCFF',
    alignSelf: 'center'
  },
  buttonTextSelected: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
});
