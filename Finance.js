'use strict';

import React, {
  Navigator,
} from 'react-native';

import {
  Router,
  Route,
  Schema,
} from 'react-native-router-flux';

var Main = require('./App/Views/Main');
var Web = require('./App/Views/web');
var Settings = require('./App/Views/Settings');
var AddNew = require('./App/Views/AddNew');

export default class Example extends React.Component {
  render() {
    return (
      <Router hideNavBar={true} >
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>

        <Route name="main" component={Main} title="Main" type="replace"/>
        <Route name="web" component={Web} title="Yahoo" />
        <Route name="settings" component={Settings} title="Settings" schema="modal" />
        <Route name="add" component={AddNew} title="Add" schema="modal" />
      </Router>
    );
  }
}
