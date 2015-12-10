/* @flow */
'use strict';

var React = require('react-native');

var {
  Text,
  View,
} = React;

// Styles
var styles = require('./style');

var DetailsPage = React.createClass({
  getInitialState: function() {
    return {
      timeSpan: '1D',
    };
  },

  render: function() {
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
  },
});

module.exports = DetailsPage;
