import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

// Elements
import StockCell from './elements/stock-cell';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Utils
import finance from '../../utils/finance';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      text: null,
      helpText: 'Type a company name or stock symbol.',
    };
  }

  _onTyping(text) {
    this.setState({
      text: text.text || '',
      helpText: 'Validating symbol...',
    });

    var that = this;
    finance.symbolSuggest(text.text)
      .then((response) => response.text())
      .then((result) => {
        result = result.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2');
        console.log(result);
        return JSON.parse(result);
      }).then((json) => {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(json.ResultSet.Result),
          loaded: true,
          helpText: 'Type a company name or stock symbol.',
        });
      }).catch((error) => {
        console.log('Request failed', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <View style={{height: 20, backgroundColor: '#202020'}}/>}
        <View style={styles.topBlock}>
          <Text style={styles.helpText}>
            {this.state.helpText}
          </Text>
          <View style={styles.searchBar}>
            <Icon style={styles.searchIcon} name="search" size={20} color="white" />
            <TextInput
              style={styles.searchBarInput}
              autoCapitalize={'characters'}
              autoFocus={true}
              placeholder="Search"
              placeholderTextColor="gray"
              onChangeText={(text) => this._onTyping({text})}
              value={this.state.text}
            />
            {(this.state.text && this.state.text.length > 0) ?
              <Icon
                style={styles.clearIcon}
                name="cancel" size={20}
                color="white"
                onPress={() => this.setState({
                  text: '',
                  dataSource: this.state.dataSource.cloneWithRows([]),
                })}
                /> : null}
            <TouchableHighlight style={styles.cancelButton}
              underlayColor="black"
              onPress={Actions.pop}>
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.suggestion}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(stock) => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  topBlock: {
    backgroundColor: '#202020',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
  searchBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    paddingRight: 5,
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 30,
    backgroundColor: '#424242',
    borderRadius: 4,
    color: 'white',
    paddingLeft: 10,
  },
  clearIcon: {
    paddingLeft: 2,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#3CABDA',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 4,
  },
  suggestion: {
    flex: 10,
    paddingHorizontal: 15,
  },
});
