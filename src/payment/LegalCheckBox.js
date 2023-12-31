import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';

const WINDOW_HEIGHT = Dimensions.get('window').height;
// 체크박스 높이
const MIN_HEIGHT = WINDOW_HEIGHT * 0.075;
// 폰트 사이즈
const FONT_SIZE = WINDOW_HEIGHT * 0.02;

const LegalCheckBox = ({ label, value, onChange }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text style={[styles.checkboxLabel, { flex: 1 }]}>{label}</Text>
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? '#007bff' : undefined}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: MIN_HEIGHT,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  checkboxLabel: {
    fontSize: FONT_SIZE,
    marginRight: 10,
  },
});

export default LegalCheckBox;
