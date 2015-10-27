'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: '#202020',
    color: 'white',
    marginBottom: 10,
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
    backgroundColor: 'black',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  suggestion: {
    flex: 10,
  },
});
