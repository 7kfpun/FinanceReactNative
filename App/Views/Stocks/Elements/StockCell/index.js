'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var store = require('react-native-simple-store');

var {
  Text,
  TouchableHighlight,
  View,
} = React;

// Flux
var PropertyActions = require('../../../../Utils/Property/actions');
var PropertyStore = require('../../../../Utils/Property/store');

// Styles
var styles = require('./style');

var StockCell = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onChangeShowingProperty: function(data) {
    this.setState({
      showingProperty: data,
    });
  },

  getInitialState: function() {
    return {
      showingProperty: 'Change',
    };
  },

  componentDidMount: function() {
    this.listenTo(PropertyStore, this.onChangeShowingProperty);

    store.get('showingProperty').then((result) => {
      if (!result) {
        result = 'Change';
        store.save('showingProperty', result);
      }
      this.setState({
        showingProperty: result,
      });
    });
  },

  getShowingProperty: function () {
    store.get('showingProperty').then((result) => {
      return result;
    });
  },

  changeShowingProperty: function(currentShowingProperty) {
    var newShowingProperty;
    if (currentShowingProperty === 'Change') {
      newShowingProperty = 'ChangeinPercent';
    } else if (currentShowingProperty === 'ChangeinPercent') {
      newShowingProperty = 'MarketCapitalization';
    } else if (currentShowingProperty === 'MarketCapitalization') {
      newShowingProperty = 'Change';
    }
    store.save('showingProperty', newShowingProperty);
    PropertyActions.changeShowingProperty(newShowingProperty);
  },

  render: function() {
    console.log(this.props.stock);
    return (
      <TouchableHighlight onPress={this.props.onSelect} underlayColor='#202020'>
        <View style={styles.container}>
          <View style={styles.stockContainer}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
                {this.props.stock.Symbol}
              </Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                {this.props.stock.LastTradePriceOnly}
              </Text>
            </View>
            <TouchableHighlight
                style={(() => {
                  switch (this.props.stock.Change && this.props.stock.Change.startsWith('+')) {
                    case true:                   return styles.changeGreen;
                    case false:                  return styles.changeRed;
                    default:                     return styles.changeGreen;
                  }
                })()}
                underlayColor={(() => {
                  switch (this.props.stock.Change && this.props.stock.Change.startsWith('+')) {
                    case true:                   return '#53D769';
                    case false:                  return '#FC3D39';
                    default:                     return '#53D769';
                  }
                })()}
                onPress={() => this.changeShowingProperty(this.state.showingProperty)}>
              <View>
                <Text style={styles.changeText}>
                  {(() => {
                    switch (this.state.showingProperty) {
                      case 'Change':                 return this.props.stock.Change || '--';
                      case 'ChangeinPercent':        return this.props.stock.ChangeinPercent || '--';
                      case 'MarketCapitalization':   return this.props.stock.MarketCapitalization || '--';
                      default:                       return this.props.stock.Change || '--';
                    }
                  })()}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = StockCell;
