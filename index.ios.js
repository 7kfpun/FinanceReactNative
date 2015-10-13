'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');

var {
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  StyleSheet,
} = React;

// Views
var AddNewView = require('./App/Views/AddNew');
var SettingsView = require('./App/Views/Settings');
var StocksView = require('./App/Views/Stocks');

var Finance = React.createClass({

  _onPressCancelButton: function() {
    this.refs.nav.pop();
  },

  _onPressAddButton: function() {
    this.refs.nav.push({
      title: 'Add new',
      component: AddNewView,
      leftButtonTitle: 'Cancel',
      onLeftButtonPress: this._onPressCancelButton,
    })
  },

  _onPressSettingsButton: function() {
    this.refs.nav.push({
      title: 'Stocks',
      component: SettingsView,
      leftButtonIcon: require('image!NavBarButtonPlus'),
      onLeftButtonPress: this._onPressAddButton,
      rightButtonTitle: 'Done',
      onRightButtonPress: this._onPressCancelButton,
    })
  },

  render: function() {
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          title: 'Finance',
          component: StocksView,
          leftButtonTitle: '⚙',
          rightButtonTitle: '☰',
          // rightButtonIcon: require('image!NavBarButtonPlus'),
          onRightButtonPress: this._onPressSettingsButton,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
});

AppRegistry.registerComponent('Finance', () => Finance);
