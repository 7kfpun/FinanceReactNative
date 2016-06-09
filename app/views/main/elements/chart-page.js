import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class ChartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: '1D',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeSpanGroup}>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '1D'})}
            underlayColor="#202020">
            <Text style={[this.state.timeSpan === '1D' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1D'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '5D'})}
            underlayColor="#202020">
          <Text style={[this.state.timeSpan === '5D' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1W'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '1M'})}
            underlayColor="#202020">
            <Text style={[this.state.timeSpan === '1M' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1M'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '3M'})}
            underlayColor="#202020">
            <Text style={[this.state.timeSpan === '3M' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'3M'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '6M'})}
            underlayColor="#202020">
            <Text style={[this.state.timeSpan === '6M' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'6M'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '1Y'})}
            underlayColor="#202020">
            <Text style={[this.state.timeSpan === '1Y' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1Y'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '2Y'})}
            underlayColor="#202020">
            <Text style={[this.state.timeSpan === '2Y' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'2Y'}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chart}>
          <Image
            style={styles.image}
            source={{uri: 'http://chart.finance.yahoo.com/z?s=' + this.props.stock.symbol + '&t=' + this.state.timeSpan.toLowerCase() + '&key=' + Math.random()}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeSpanGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  timeSpan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpanText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  timeSpanSelectedText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  chart: {
    flex: 4,
  },
  image: {
    flex: 1,
  },
});
