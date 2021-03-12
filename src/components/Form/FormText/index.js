import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default function FormText({label, placeholder, onChange}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#474747"
          onChangeText={onChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  textInput: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
});
