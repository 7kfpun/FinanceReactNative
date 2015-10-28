'use strict';

var React = require('react-native');

var {
  PixelRatio,
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stocksBlock: {
    flexDirection: 'column',
    flex: 9,
  },
  middleBlock: {
    flexDirection: 'row',
    flex: 5,
    backgroundColor: '#202020',
    justifyContent: 'space-between',
  },
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
    color: 'white',
  },
  stocksListView: {
    flex: 3,
    backgroundColor: 'black',
  },
  detailsBlock: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
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
    height: 1.5 / PixelRatio.get(),
    backgroundColor: '#CCCCCC',
  },
  separatorThin: {
    height: 1 / PixelRatio.get(),
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
  yahoo: {
    flex: 1,
  },
  yahooText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  footerMiddle: {
    flex: 1,
  },
  marketTimeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'center',
    marginBottom: 4,
  },
  changeDetailView: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'center',
    marginTop: 2,
  },
  settings: {
    flex: 1,
    alignItems: 'flex-end',
  },
  changeSlide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chartBlock: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  chartTimeSpanGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  chartTimeSpan: {
    flex: 1,
    alignItems: 'center',
  },
  chartTimeSpanText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  chartTimeSpanSelectedText: {
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
  icon: {
    width: 20,
    height: 20,
  },
});
