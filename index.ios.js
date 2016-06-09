import {
  AppRegistry,
  StatusBar,
} from 'react-native';
import Finance from './finance';

StatusBar.setBarStyle('light-content', true);

AppRegistry.registerComponent('Finance', () => Finance);
