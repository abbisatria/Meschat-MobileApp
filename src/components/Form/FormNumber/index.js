import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default function FormNumber({
  label,
  placeholder,
  onChange,
  onBlur,
  value,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={styles.phone}>+62</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#474747"
          onChangeText={onChange}
          keyboardType="phone-pad"
          onBlur={onBlur}
          defaultValue={value}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  phone: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    borderRightColor: '#ffffff',
    borderRightWidth: 1,
    paddingRight: 10,
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    flex: 1,
  },
});
