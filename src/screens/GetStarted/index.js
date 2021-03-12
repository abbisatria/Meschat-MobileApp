import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from '../../assets/images/Logo.svg';

const GetStarted = (props) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View>
        <Text style={styles.title}>Meschat</Text>
        <Text style={styles.subTitle}>
          The world's fastest messaging app. It is free and secure
        </Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Sign up for free</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.gap} />
      <View style={styles.row}>
        <Text style={styles.textReady}>Already a member? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
          <Text style={styles.textSignIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center',
    paddingRight: 38,
    paddingLeft: 38,
    paddingTop: 100,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 112,
  },
  subTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 10,
    width: 180,
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#000000',
  },
  gap: {
    height: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textReady: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#ffffff',
  },
  textSignIn: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
});
