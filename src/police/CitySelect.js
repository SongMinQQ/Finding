import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PickerSelect from 'react-native-picker-select';

const CitySelect = (props) => {

  const cities = [
    { label: '서울', value: '서울' },
    { label: '부산', value: '부산' },
    { label: '대구', value: '대구' },
    { label: '인천', value: '인천' },
    { label: '광주', value: '광주' },
    { label: '대전', value: '대전' },
    { label: '울산', value: '울산' },
    { label: '경기도', value: '경기도' },
    { label: '강원도', value: '강원도' },
    { label: '충청북도', value: '충청북도' },
    { label: '충청남도', value: '충청남도' },
    { label: '전라북도', value: '전라북도' },
    { label: '전라남도', value: '전라남도' },
    { label: '경상북도', value: '경상북도' },
    { label: '경상남도', value: '경상남도' },
    { label: '제주도', value: '제주도' },
  ];

  return (
    <View style={styles.container}>
      <PickerSelect
        onValueChange={(itemValue) => props.changeFunction(itemValue)}
        items={cities}
        value={props.city}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false} // 안드로이드에서 네이티브 스타일을 사용하지 않도록 설정
        placeholder={{ label: "지역을 선택하세요", value: null }} // 기본 플레이스홀더 설정
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // iOS에서 화살표 아이콘 영역을 확보
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // 안드로이드에서 화살표 아이콘 영역을 확보
  },
});

export default CitySelect;
