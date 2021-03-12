import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Arrow from '../../assets/icons/Arrow.svg';

export default class Verification extends Component {
  state = {
    code: '',
  };
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
            onPress={() => this.props.navigation.replace('SignIn')}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>+62 813-8163-3702</Text>
          <Text style={styles.subTitle}>
            We have sent you an SMS with the code
          </Text>
          <View style={styles.rowCode}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              placeholderTextColor="#474747"
              keyboardType="number-pad"
              onChangeText={(code) => this.setState({code})}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.subTitle}>Haven't received the code?</Text>
          </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 72,
  },
  gap: {
    height: 15,
  },
  rowCode: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#474747',
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  input: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
});
