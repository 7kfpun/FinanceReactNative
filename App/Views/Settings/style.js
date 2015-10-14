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
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonLeftSelected: {
    backgroundColor: '#3CABDA',
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonMiddleSelected: {
    backgroundColor: '#3CABDA',
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonRightSelected: {
    backgroundColor: '#3CABDA',
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  buttonTextSelected: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'center'
  },
});
