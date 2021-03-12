import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function ContactItem({image, name, phone}) {
  return (
    <View style={styles.column}>
      <View style={styles.chat}>
        <Image source={image} style={styles.image} />
        <View style={styles.rowChat}>
          <View style={styles.rowSender}>
            <Text style={styles.textSender}>{name}</Text>
          </View>
          <Text style={styles.textChat}>{phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    paddingLeft: 10,
  },
  chat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  rowChat: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3f',
    marginLeft: 10,
    paddingRight: 10,
  },
  rowSender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSender: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  textChat: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#979799',
  },
});
