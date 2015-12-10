'use strict';

var React = require('react-native');

var {
  PixelRatio,
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1 / PixelRatio.get(),
    backgroundColor: '#202020',
    borderRadius: 4,
    color: 'white',
    paddingLeft: 10,
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  cancelButton: {
    flex: 1,
    height: 40,
    marginLeft: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  suggestion: {
    flex: 10,
  },
});
