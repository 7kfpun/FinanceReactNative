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
    position: 'absolute',
    top: 58,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBlock: {
    flex: 1
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1 / PixelRatio.get(),
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center'
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1 / PixelRatio.get(),
    flex: 1,
    justifyContent: 'center'
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: 1 / PixelRatio.get(),
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center'
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  buttonTextSelected: {
    color: 'black',
  },
});
