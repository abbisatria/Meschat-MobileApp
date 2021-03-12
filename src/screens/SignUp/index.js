import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormNumber from '../../components/Form/FormNumber';
import FormPassword from '../../components/Form/FormPassword';

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Verification')}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subTitle}>
            Create your account to {'\n'} access Meschat
          </Text>
          <FormNumber label="Phone Number" placeholder="Your phone number" />
          <View style={styles.gap} />
          <FormPassword label="Password" placeholder="Your password" />
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
