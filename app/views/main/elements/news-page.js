import React from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';

// Elements
import NewsCell from './news-cell';

import rss from '../../../utils/rss';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default class NewsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      key: Math.random(),
    };
  }

  componentDidMount() {
    const that = this;
    rss(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${this.props.stock.symbol}&region=US&lang=en-US`).then((json) => {
      console.log(json);
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(json.query.results.item),
        key: Math.random(),
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          key={this.state.key}
          dataSource={this.state.dataSource}
          renderRow={news => <NewsCell news={news} />}
        />
      </View>
    );
  }
}

NewsPage.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string,
  }),
};

NewsPage.defaultProps = {
  stock: {},
};
