/* @flow */
'use strict';

import React, {
  ListView,
  Platform,
  Text,
  ToolbarAndroid,
  TouchableHighlight,
  View,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';

// Flux
import Reflux from 'reflux';
import PropertyActions from '../../Utils/Property/actions';
import PropertyStore from '../../Utils/Property/store';
import StockStore from '../../Utils/Stock/store';

// Elements
import StockCell from './Elements/StockCell';

// Styles
import styles from './style';

var SettingsView = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onChangeShowingProperty: function(data: string) {
    this.setState({
      showingProperty: data,
    });
  },

  onUpdateStocks: function(watchlist: Array<Object>, result: Array<Object>) {
    this._genRows(watchlist, result);
  },

  onDeleteStock: function(watchlist: Array<Object>, result: Array<Object>) {
    this._genRows(watchlist, result);
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.listenTo(PropertyStore, this.onChangeShowingProperty);
    this.listenTo(StockStore, this.onDeleteStock);
    this.listenTo(StockStore, this.onUpdateStocks);

    store.get('showingProperty').then((result) => {
      this.setState({
        showingProperty: result,
      });
    });

    store.get('watchlist').then((watchlist) => {
      store.get('watchlistResult').then((result) => {
        this._genRows(watchlist, result);
      });
    });
  },

  _genRows: function(watchlist: Array<Object>, result: Array<Object>) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(watchlist),
      loaded: true,
      watchlistResult: result,
    });
  },

  _setShowingProperty: function(value: string) {
    this.setState({
      showingProperty: value,
    });
    store.save('showingProperty', value);
    PropertyActions.changeShowingProperty(value);
  },

  onActionSelected: function(position) {
    if (position === 0) {  // index of 'Add'
      Actions.add();
    } else if (position === 1) {  // index of 'Done'
      Actions.pop();
    }
  },

  renderToolbar: function() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          style={styles.navigatorTitle}
          tintColor="#202020"
          title={{title: this.props.title, tintColor: 'white'}}
          leftButton={<Icon style={styles.navigatorLeftButton} name="add" size={26} color="#3CABDA" onPress={() => Actions.add()} />}
          rightButton={{title: 'Done', handler: () => Actions.pop(), tintColor: '#3CABDA', style: styles.navigatorRightButton}}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          title={this.props.title}
          actions={[
            {title: 'Add', show: 'always'},
            {title: 'Done', show: 'always'},
          ]}
          onActionSelected={(position) => this.onActionSelected(position)} />
      );
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.renderToolbar()}

        <View style={styles.topBlock}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(stock) => <StockCell stock={stock} watchlistResult={this.state.watchlistResult}/>}
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight style={[styles.buttonLeft, this.state.showingProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => this._setShowingProperty('ChangeinPercent')}>
            <Text style={[styles.buttonText, this.state.showingProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonMiddle, this.state.showingProperty === 'Change' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => this._setShowingProperty('Change')}>
            <Text style={[styles.buttonText, this.state.showingProperty === 'Change' ? styles.buttonTextSelected : null]}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRight, this.state.showingProperty === 'MarketCapitalization' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => this._setShowingProperty('MarketCapitalization')}>
            <Text style={[styles.buttonText, this.state.showingProperty === 'MarketCapitalization' ? styles.buttonTextSelected : null]}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = SettingsView;
