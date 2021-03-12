import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import FormPassword from '../../components/Form/FormPassword';

import Arrow from '../../assets/icons/Arrow.svg';

export default class SetPassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.rowBack}>
              <Arrow />
              <Text style={styles.textBack}>Back</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Set Password</Text>
          <TouchableOpacity>
            <Text style={styles.text}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowNote}>
          <FormPassword placeholder="Your new password" label="New Password" />
          <View style={styles.gap} />
          <FormPassword
            placeholder="Your confirm password"
            label="Confirm Password"
          />
          <Text style={styles.note}>
            You can choose a password on Meschat. {'\n'}
            {'\n'}You can use a-z, 0-9 and underscores. Minimum length is 5
            characters.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  textBack: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    marginLeft: 5,
  },
  note: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#818085',
    marginTop: 15,
  },
  rowNote: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  gap: {
    height: 10,
  },
});
