import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class DetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: '1D',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>
            {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Name || '--'}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                OPEN
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Open || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                MKT CAP
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].MarketCapitalization || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                HIGH
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].DaysHigh || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                52W HIGH
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].YearHigh || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                LOW
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].DaysLow || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                52W LOW
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].YearLow || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                VOL
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Volume || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                AVG VOL
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].AverageDailyVolume || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                P/E
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].PERatio || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                YIELD
              </Text>
              <Text style={styles.valueText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].DividendYield && this.props.watchlistResult[this.props.stock.symbol].DividendYield + '%' || '--'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A6A6A6',
  },
  propertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
  valueText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
  },
});
