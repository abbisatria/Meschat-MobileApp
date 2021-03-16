import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IcRead from '../../assets/icons/ic-read.svg';

export default function isMe({message, dateTime}) {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.textChat}>{message}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{dateTime}</Text>
        <IcRead />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: '#303030',
    maxWidth: '70%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  textChat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    marginRight: 5,
  },
});
