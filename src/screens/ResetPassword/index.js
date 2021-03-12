import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormPassword from '../../components/Form/FormPassword';

export default class ResetPassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subTitle}>
            Create and confirm your new password so you can login to Meschat
          </Text>
          <FormPassword label="New Password" placeholder="Your new password" />
          <View style={styles.gap} />
          <FormPassword
            label="Confirm Password"
            placeholder="Your confirm password"
          />
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
});
