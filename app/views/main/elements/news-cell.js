import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import moment from 'moment';

export default class NewsCell extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => Linking.openURL(
          this.props.news.link
        ).catch(err => console.error('An error occurred', err))}
        underlayColor="#202020"
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {this.props.news.title}
          </Text>
          <Text style={styles.timeText}>
            {moment(new Date(this.props.news.publishedDate)).format('D/M/YYYY') + ' at ' + moment(new Date(this.props.news.publishedDate)).format('LT')}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: '#202020',
  },
  titleText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
  },
  timeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
});
