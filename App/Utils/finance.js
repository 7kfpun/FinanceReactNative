/* @flow */
exports.getStock = function(opts: Object, type: string) : Object {
  var defs = {
    baseURL: 'http://query.yahooapis.com/v1/public/yql?q=',
    query: {
      quotes: 'select * from yahoo.finance.quotes where symbol in ("{stock}")',
      historicaldata: 'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"',
    },
    suffixURL: {
      quotes: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
      historicaldata: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
    }
  };

  opts = opts || {};

  if (!opts.stock) {
    console.log('No stock defined');
    return;
  }

  if (opts.stock instanceof Array) {
    opts.stock = opts.stock.join("', '");
  }

  console.log(opts.stock);

  var query = defs.query[type]
    .replace('{stock}', opts.stock)
    .replace('{startDate}', opts.startDate)
    .replace('{endDate}', opts.endDate);

    var url = defs.baseURL + query + (defs.suffixURL[type] || '');
  console.log(url);
  return fetch(url);
};

exports.properties = [
	'AfterHoursChangeRealtime',
	'AnnualizedGain',
	'Ask',
	'AskRealtime',
	'AverageDailyVolume',
	'Bid',
	'BidRealtime',
	'BookValue',
	'Change',
	'ChangeFromFiftydayMovingAverage',
	'ChangeFromTwoHundreddayMovingAverage',
	'ChangeFromYearHigh',
	'ChangeFromYearLow',
	'ChangePercentRealtime',
	'ChangeRealtime',
	'Change_PercentChange',
	'ChangeinPercent',
	'Commission',
	'Currency',
	'DaysHigh',
	'DaysLow',
	'DaysRange',
	'DaysRangeRealtime',
	'DaysValueChange',
	'DaysValueChangeRealtime',
	'DividendPayDate',
	'DividendShare',
	'DividendYield',
	'EBITDA',
	'EPSEstimateCurrentYear',
	'EPSEstimateNextQuarter',
	'EPSEstimateNextYear',
	'EarningsShare',
	'ErrorIndicationreturnedforsymbolchangedinvalid',
	'ExDividendDate',
	'FiftydayMovingAverage',
	'HighLimit',
	'HoldingsGain',
	'HoldingsGainPercent',
	'HoldingsGainPercentRealtime',
	'HoldingsGainRealtime',
	'HoldingsValue',
	'HoldingsValueRealtime',
	'LastTradeDate',
	'LastTradePriceOnly',
	'LastTradeRealtimeWithTime',
	'LastTradeTime',
	'LastTradeWithTime',
	'LowLimit',
	'MarketCapRealtime',
	'MarketCapitalization',
	'MoreInfo',
	'Name',
	'Notes',
	'OneyrTargetPrice',
	'Open',
	'OrderBookRealtime',
	'PEGRatio',
	'PERatio',
	'PERatioRealtime',
	'PercebtChangeFromYearHigh',
	'PercentChange',
	'PercentChangeFromFiftydayMovingAverage',
	'PercentChangeFromTwoHundreddayMovingAverage',
	'PercentChangeFromYearLow',
	'PreviousClose',
	'PriceBook',
	'PriceEPSEstimateCurrentYear',
	'PriceEPSEstimateNextYear',
	'PricePaid',
	'PriceSales',
	'SharesOwned',
	'ShortRatio',
	'StockExchange',
	'Symbol',
	'TickerTrend',
	'TradeDate',
	'TwoHundreddayMovingAverage',
	'Volume',
	'YearHigh',
	'YearLow',
	'YearRange',
];

exports.getNews = function(symbol: string) : Object {
  var url = 'http://feeds.finance.yahoo.com/rss/2.0/headline?s=' + symbol + '&region=US&lang=en-US';
  console.log(url);
  return fetch(url)
    .then(function(response) {
      return response.text();
    }).then(function(body) {
      console.log(body);
    });
};

exports.symbolSuggest = function(query: string) : Object {
  // http://d.yimg.com/aq/autoc?query=0050&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks
  var url = 'http://d.yimg.com/aq/autoc?query=' + query + '&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks';
  console.log(url);
  return fetch(url);
};
