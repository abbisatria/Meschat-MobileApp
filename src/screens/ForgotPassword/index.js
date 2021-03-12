import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormNumber from '../../components/Form/FormNumber';
import Arrow from '../../assets/icons/Arrow.svg';

export default class ForgotPassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.rowHeader}>
              <Arrow />
              <Text style={styles.back}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Verification')}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subTitle}>
            Enter your phone number so we can send you a verification code for
            resetting your password.
          </Text>
          <FormNumber placeholder="Your phone number" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    marginLeft: 10,
  },
  next: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    textAlign: 'right',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 72,
  },
  gap: {
    height: 15,
  },
  textForgot: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    textAlign: 'right',
    marginTop: 15,
  },
});
