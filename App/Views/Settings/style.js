'use strict';

import {
  Platform,
  PixelRatio,
  StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'black',
  },
  navigatorTitle: {
    backgroundColor: '#202020',
    height: 39 - 12,
  },
  navigatorLeftButton: {
    marginTop: -12,
    paddingLeft: 10,
    paddingRight: 50,
  },
  navigatorRightButton: {
    marginTop: -12,
    paddingLeft: 50,
    paddingRight: 10,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#E9EAED'
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
