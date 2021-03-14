import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

class Loading extends Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
