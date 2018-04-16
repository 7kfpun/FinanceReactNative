import {
  AppRegistry,
  StatusBar,
} from 'react-native';

import Finance from './Finance';

console.disableYellowBox = true;
StatusBar.setBarStyle('light-content', true);

AppRegistry.registerComponent('Finance', () => Finance);
