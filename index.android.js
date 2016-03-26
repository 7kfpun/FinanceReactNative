'use strict';

import {
  AppRegistry,
  BackAndroid,
} from 'react-native';
import Finance from './Finance';

import { Actions } from 'react-native-router-flux';

BackAndroid.addEventListener('hardwareBackPress', () => {
  try {
    Actions.pop();
    return true;
  } catch (err) {
    return false;
  }
});

AppRegistry.registerComponent('Finance', () => Finance);
