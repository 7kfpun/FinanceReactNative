'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
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
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
});
