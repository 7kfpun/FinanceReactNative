import {
  AppRegistry,
  StatusBar,
} from 'react-native';
import Finance from './Finance';

StatusBar.setBarStyle('light-content', true);

AppRegistry.registerComponent('Finance', () => Finance);
