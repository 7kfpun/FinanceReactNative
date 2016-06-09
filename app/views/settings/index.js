import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// Flux
import StockActions from '../../actions/stock-action';
import StockStore from '../../stores/stock-store';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

// View Elements
import StockCell from './elements/stock-cell';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      key: Math.random(),
    }, StockStore.getState());
  }

  componentDidMount() {
    StockStore.listen((state) => this.onStockStoreChange(state));

    StockActions.updateStocks();
  }

  componentWillUnmount() {
    StockStore.unlisten((state) => this.onStockStoreChange(state));
  }

  onStockStoreChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.watchlist),
      watchlistResult: state.watchlistResult,
      selectedProperty: state.selectedProperty,
      key: Math.random(),
    });
  }

  onActionSelected(position) {
    if (position === 0) {  // index of 'Add'
      Actions.add();
    } else if (position === 1) {  // index of 'Done'
      Actions.pop();
    }
  }

  renderToolbar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          statusBar={{tintColor: '#202020', style: 'light-content'}}
          style={styles.navigatorBarIOS}
          title={{title: this.props.title, tintColor: 'white'}}
          leftButton={<Icon style={styles.navigatorLeftButton} name="add" size={26} color="#3CABDA" onPress={Actions.add} />}
          rightButton={{
            title: 'Done',
            tintColor: '#3CABDA',
            handler: Actions.pop,
          }}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={this.props.title}
          titleColor="white"
          actions={[
            {title: 'Add', iconName: 'add', iconSize: 26, show: 'always'},
            {title: 'Done', iconName: 'check', iconSize: 26, show: 'always'},
          ]}
          onActionSelected={(position) => this.onActionSelected(position)}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <View style={styles.topBlock}>
          <ListView
            key={this.state.key}
            dataSource={this.state.dataSource}
            renderRow={(stock) => <StockCell stock={stock} watchlistResult={this.state.watchlistResult}/>}
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight style={[styles.buttonLeft, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => StockActions.selectProperty('ChangeinPercent')}>
            <Text style={[styles.buttonText, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonMiddle, this.state.selectedProperty === 'Change' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => StockActions.selectProperty('Change')}>
            <Text style={[styles.buttonText, this.state.selectedProperty === 'Change' ? styles.buttonTextSelected : null]}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRight, this.state.selectedProperty === 'MarketCapitalization' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => StockActions.selectProperty('MarketCapitalization')}>
            <Text style={[styles.buttonText, this.state.selectedProperty === 'MarketCapitalization' ? styles.buttonTextSelected : null]}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  navigatorBarIOS: {
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
  navigatorRightButton: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 10,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#202020',
  },
  topBlock: {
    flex: 1
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center'
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center'
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center'
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  buttonTextSelected: {
    color: 'black',
  },
});
