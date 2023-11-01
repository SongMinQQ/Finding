import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CountySelect from './CountySelect';
import CitySelect from './CitySelect';

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
            <Text>경찰청api 페이지</Text>
            <View style={styles.row}>
                <CitySelect changeFunction={cityChange} city={selectedCity} />
                <CountySelect changeFunction={countyChange} county={selectedCounty} city={selectedCity} />
                <TextInput 
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="검색..."
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        marginLeft: 10
    }
});

export default PoliceFind;