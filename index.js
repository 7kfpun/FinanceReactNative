'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');
var NavigationBar = require('react-native-navbar');

var {
  Navigator,
  PixelRatio,
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

Platform.OS === 'ios' ? StatusBarIOS.setStyle('light-content', false): null;

var Finance = React.createClass({
  getInitialState: function() {
    return {};
  },

  _onPressDoneButton: function() {
    this.refs.nav.pop();
  },

  _onPressAddButton: function() {
    this.refs.nav.push({
      title: 'Add new',
      component: AddNewView,
      leftButtonTitle: 'Cancel',
      onLeftButtonPress: this._onPressDoneButton,
    })
  },

  _onPressSettingsButton: function() {
    this.refs.nav.push({
      title: 'Stocks',
      component: SettingsView,
      leftButtonIcon: require('image!NavBarButtonPlus'),
      onLeftButtonPress: this._onPressAddButton,
      rightButtonTitle: 'Done',
      onRightButtonPress: this._onPressDoneButton,
    })
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
        return Navigator.SceneConfigs.HorizontalSwipeJump;
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
        // navBar = <NavigationBar
        //     style={styles.navBar}
        //     customPrev={<View style={styles.navBarLeftButton}></View>}
        //     title='Finance'
        //     titleColor='white'/>;
        break;
      case 'settings':
        Component = SettingsView;
        navBar = <NavigationBar
          style={styles.navBar}
          customPrev={<TouchableOpacity
              onPress={() => navigator.push({title: 'Add', id: 'add'})}
              style={styles.navBarLeftButton}>
              <Text style={[styles.navBarText, styles.navBarButtonText]}>
                ＋
              </Text>
            </TouchableOpacity>}
          customNext={<TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.navBarRightButton}>
              <Text style={[styles.navBarText, styles.navBarButtonText]}>
                Done
              </Text>
            </TouchableOpacity>}
          title='Settings'
          titleColor='white'/>;
        break;
      case 'add':
        Component = AddNewView;
        navBar = <NavigationBar
          style={styles.navBar}
          customPrev={<TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>}
          title='Add'
          titleColor='white'/>;
        break;
      case 'yahoo':
        Component = WebView;
        navBar = <NavigationBar
          customPrev={<TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>}
          title='Yahoo'
          titleColor='white'/>;
        break;
      }

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: navigator,
        route: route
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
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
        style={styles.nav}
        initialRoute={{title: 'Finance', index: 0, id: 'stocks'}}
        renderScene={this.renderScene}
        // navigationBar={
        //   <Navigator.NavigationBar
        //     routeMapper={NavigationBarRouteMapper}
        //     style={styles.navBar}
        //   />
        // }
        configureScene={this.configureScene}
      />
    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (route.id === 'stocks') {
      return null;
    } else if (route.id === 'settings') {
      return (
        <TouchableOpacity
          onPress={() => navigator.push({title: 'Add', id: 'add'})}
          style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            ＋
          </Text>
        </TouchableOpacity>
      );
    } else if (route.id === 'add') {
      return null;
    } else if (route.id === 'yahoo') {
      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}
          style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Back
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  },

  RightButton: function(route, navigator, index, navState) {
    if (route.id === 'stocks') {
      return null;
    } else if (route.id === 'settings') {
      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}
          style={styles.navBarRightButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Done
          </Text>
        </TouchableOpacity>
      );
    } else if (route.id === 'add') {
      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}
          style={styles.navBarRightButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Cancel
          </Text>
        </TouchableOpacity>
      );
    } else if (route.id === 'yahoo') {
      return null;
    } else {
      return null;
    }
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  statusBar: {
    height: 20,
  },
  navBar: {
    height: 44,
    backgroundColor: '#141414',
    justifyContent: 'space-between',
  },
  navBarText: {
    fontSize: 18,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#3CABDA',
  },
});

module.exports = Finance;
