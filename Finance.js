import React from 'react';

// 3rd party libraries
import {
  Actions,
  Router,
  Scene,
  // Reducer,
} from 'react-native-router-flux';

// Views
import MainView from './app/views/main';
import SettingsView from './app/views/settings';
import AddView from './app/views/add';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = [
  'Warning: In next release empty section headers will be rendered.',
  'Warning: setState(...): Can only update a mounted or mounting component.',
];

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="main" title="Main" component={MainView} initial={true} />
    <Scene key="settings" direction="vertical" title="Stocks" component={SettingsView} />
    <Scene key="add" direction="vertical" title="Add" component={AddView} />
  </Scene>
);

export default class Periods extends React.Component {
  render() {
    return <Router scenes={scenes} />;
  }
}
