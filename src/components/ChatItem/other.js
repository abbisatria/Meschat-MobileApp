import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function other({message, dateTime}) {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.textChat}>{message}</Text>
      </View>
      <Text style={styles.date}>{dateTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: '#303030',
    maxWidth: '70%',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  textChat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
});
