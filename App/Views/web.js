"use strict";

import React, {
  PixelRatio,
  Platform,
  StyleSheet,
  ToolbarAndroid,
  View,
  WebView,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';

class CustomWebView extends React.Component {
  renderToolbar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          title={{title: this.props.title}}
          leftButton={<Icon style={styles.navigatorLeftButton} name="arrow-back" size={26} color="gray" onPress={() => Actions.pop()} />}
          />
      );
    } else if (Platform.OS === 'android') {
      return (
        <ToolbarAndroid style={styles.toolbar} title={this.props.title} />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <View style={styles.separator} />

        <WebView
          url={this.props.url}
          javaScriptEnabledAndroid={true}
          domStorageEnabled={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorLeftButton: {
    paddingLeft: 10,
    paddingRight: 50,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#E9EAED'
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#CCCCCC',
  },
});

module.exports = CustomWebView;
