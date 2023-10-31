import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';

// 창의 높이를 사용하여 사이즈를 계산합니다.
const WINDOW_HEIGHT = Dimensions.get('window').height;

// 반응형 사이즈를 위한 상대적 단위
const MIN_HEIGHT = WINDOW_HEIGHT * 0.075; 
const FONT_SIZE = WINDOW_HEIGHT * 0.02; 

const LegalCheck = ({ label, value, onChange }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text style={[styles.checkboxLabel, { flex: 1 }]}>{label}</Text>
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? '#007bff' : undefined} // 체크박스의 색상을 조정
      />
    </View>
  );
};

// 스타일 정의
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

export default LegalCheck;
