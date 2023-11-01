import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
      <Picker
        selectedValue={props.city}
        onValueChange={(itemValue) => props.changeFunction(itemValue)}
      >
        {cities.map((city) => (
          <Picker.Item key={city.value} label={city.label} value={city.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 150
    }
})

export default CitySelect;
