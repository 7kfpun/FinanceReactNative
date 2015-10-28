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
  ToolbarAndroid,
  BackAndroid,
} = React;

// Views
var AddNewView = require('./App/Views/AddNew');
var SettingsView = require('./App/Views/Settings');
var StocksView = require('./App/Views/Stocks');
var WebView = require('./App/Views/Web');

// Styles
var styles = require('./style');

Platform.OS === 'ios' ? StatusBarIOS.setStyle('default', false): null;

var _navigator;

var NavToolbar = React.createClass({

  componentWillMount: function() {
    var navigator = this.props.navigator;
  },

  render: function () {
    if (this.props.navIcon) {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={{uri: 'ic_arrow_back_white_24dp', isStatic: true}}
          onIconClicked={this.props.navigator.pop}
          actions={this.props.actions}
          onActionSelected={this.props.onActionSelected}
          title={this.props.route.title}
          titleColor='white' />
      )
    }
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        onIconClicked={this.props.navigator.pop}
        titleColor='white'
        title='FinanceReactNative' />
    )
  }
})

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

var Finance = React.createClass({
  getInitialState: function() {
    return {};
  },

  configureSceneAndroid: function(route) {
    return Navigator.SceneConfigs.FadeAndroid;
  },

  configureSceneIOS: function(route) {
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

  renderSceneAndroid: function(route, navigator) {
    _navigator = navigator;
    if (route.id === 'stocks') {
      return (
        <View style={styles.container}>

          <StocksView navigator={navigator} route={route} />
        </View>
      );
    }
    if (route.id === 'settings') {
      return (
        <View style={styles.container}>
          <NavToolbar
            navIcon={true}
            navigator={navigator}
            route={route}
            actions={[{title: 'Add', icon: require('image!ic_plus_white'), show: 'always'}]}
            onActionSelected={() => _navigator.push({title: 'Add', id: 'add'})} />
          <SettingsView navigator={navigator} route={route} />
        </View>
      )
    }
    if (route.id === 'add') {
      return (
        <View style={styles.container}>
          <NavToolbar navIcon={true} navigator={navigator} route={route} />
          <AddNewView navigator={navigator} route={route} />
        </View>
      )
    }
    // WebView is not working for Android App
    // if (route.id === 'yahoo') {
    //   return (
    //     <View style={styles.container}>
    //       <NavToolbar navIcon={true} navigator={navigator} route={route} />
    //       <WebView title={route.title} url={route.url} />
    //     </View>
    //   )
    // }
  },

  renderSceneIOS: function(route, navigator) {
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
    var renderScene = Platform.OS === 'ios' ? this.renderSceneIOS: this.renderSceneAndroid;
    var configureScene = Platform.OS === 'ios' ? this.configureSceneIOS: this.configureSceneAndroid;

    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{title: 'Finance', id: 'stocks'}}
        configureScene={configureScene}
        renderScene={renderScene}
      />
    );
  },
});

module.exports = Finance;
