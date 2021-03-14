import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

class Loading extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth.token) {
        this.props.navigation.replace('MainApp');
      } else {
        this.props.navigation.replace('GetStarted');
      }
    }, 100);
  }
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Loading);

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
    backgroundColor: '#000000',
  },
});
