import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CountySelect from './CountySelect';
import CitySelect from './CitySelect';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';

const PoliceFind = () => {
    const [selectedCity, setSelectedCity] = useState('서울');
    const [selectedCounty, setSelectedCounty] = useState('강남');
    const [searchText, setSearchText] = useState(''); // 검색창의 상태

    const cityChange = (city) => {
        setSelectedCity(city);
    }

    const countyChange = (county) => {
        setSelectedCounty(county);
    }

    useEffect(() => {
        console.log(selectedCity);
        console.log(selectedCounty);
    }, [selectedCounty]);

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <View style={styles.row}>
                    <CitySelect changeFunction={cityChange} city={selectedCity} />
                    <CountySelect changeFunction={countyChange} county={selectedCounty} city={selectedCity} />
                </View>
                <View style={styles.row}>
                    <TextInput 
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="찾을 물건명을 입력하세요"
                        />
                    <TouchableOpacity>
                        <EvilIcons name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        flex : 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        marginLeft: 10
    },
    search: {
        //여기에 검색영역 디자인 속성 넣어야함
    }
});

export default PoliceFind;