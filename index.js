'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');
var NavigationBar = require('react-native-navbar');

var {
  Navigator,
  StatusBarIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Platform,
} = React;

// Views
var AddNewView = require('./App/Views/AddNew');
var SettingsView = require('./App/Views/Settings');
var StocksView = require('./App/Views/Stocks');
var WebView = require('./App/Views/Web');

// Styles
var styles = require('./style');

Platform.OS === 'ios' ? StatusBarIOS.setStyle('default', false): null;

var Finance = React.createClass({
  getInitialState: function() {
    return {};
  },

  configureScene : function(route){
    switch (route.id) {
      case 'settings':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'add':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'yahoo':
        return Navigator.SceneConfigs.HorizontalSwipeJump;
      default:
        return Navigator.SceneConfigs.FloatFromBottom;
      }
  },

  renderScene: function(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    switch (route.id) {
      case 'empty':
        //Com <View />;
      case 'stocks':
        Component = StocksView;
        navBar = null;
        break;
      case 'settings':
        Component = SettingsView;
        navBar = <NavigationBar
          style={styles.navBar}
          leftButton={{
            title: '＋',
            handler: () => navigator.push({title: 'Add', id: 'add'}),
            tintColor: '#3CABDA',
          }}
          rightButton={{
            title: 'Done',
            handler: () => navigator.pop(),
            tintColor: '#3CABDA',
          }}
          title={{"title": "Stocks", "tintColor": "white"}} />;
        break;
      case 'add':
        Component = AddNewView;
        navBar = null
        break;
      case 'yahoo':
        Component = WebView;
        navBar = <NavigationBar
          style={styles.navBar}
          leftButton={{
            title: 'Back',
            handler: () => navigator.pop(),
            tintColor: '#3CABDA',
          }}
          title={{"title": "Yahoo", "tintColor": "white"}} />;
        break;
      }

    if (navBar === null) {
      navBar = <View style={styles.statusBar} />;
    }

    return (
      <View style={styles.container}>
        {navBar}
        <Component
          navigator={navigator}
          route={route} />
      </View>
    );
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{title: 'Finance', index: 0, id: 'stocks'}}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
});

module.exports = Finance;
