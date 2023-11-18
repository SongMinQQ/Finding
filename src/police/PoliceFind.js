import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet,ActivityIndicator } from 'react-native';
import CountySelect from './CountySelect';
import CitySelect from './CitySelect';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

const PoliceFind = () => {
    const [selectedCity, setSelectedCity] = useState('서울');
    const [selectedCounty, setSelectedCounty] = useState('강남');
    const [searchText, setSearchText] = useState(''); // 검색창의 상태
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const search = async () => {
        const reqUrl = "https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccTpNmCstdyPlace";
        const key = "AyubNIaSXmtsRH6lOKHbuLlh8x6KqA4zoQfyNVcQ1lRTV8IMnkd7MCaUDNGYgEwlAciphXq1EWORmpQkOISXSg%3D%3D";
        const param = {
            LST_PLACE : `${selectedCity} ${selectedCounty}`,
            LST_PRDT_NM : searchText,
            pageNo : 1,
            numOfRows : 10
        };
        const searchUrl = reqUrl + '?serviceKey='+ key + '&' + new URLSearchParams(param);
        console.log(searchUrl);
        try{
            let responseData = "";
            const response = await axios.get(searchUrl)
            console.log(JSON.stringify(response.data.response.body.items.item));
            responseData = JSON.stringify(response.data.response.body.items.item);
            // let responseParseData = JSON.parse(responseData);
            console.log(response);
            if(responseData){
                setSearchResult(JSON.parse(responseData))
            }
            // else if(response.data.response.body.items.length == 1){
            //     setSearchResult()
            // }
            else{
                setSearchResult([]);
            }
            setLoading(true);//데이터 받아오는 중엔 로딩
        }
        catch(error){
            console.log(error);
        }
        finally {
            setLoading(false); // 로딩 완료 시 로딩 상태 업데이트
        }
    }
    useEffect(() => {
        // console.log(searchResult);
    },[searchResult])
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
                    <TouchableOpacity onPress={search}>
                        <EvilIcons name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.manageArea}>
                <Text style={styles.manageText}>검색 결과는 상위 10개의 항목만 제공됩니다.^^</Text>
            </View>
            {loading && 
            <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}
            <ScrollView>
                {searchResult.length > 0 ? searchResult.map((data,index) => (
                <View key={index} style={styles.resultView}>
                    <Text>카테고리 : {data.prdtClNm}</Text>
                    <Text>분실물 : {data.lstPrdtNm}</Text>
                    <Text>습득 장소 : {data.lstPlace}</Text>
                    <Text>등록 일자 : {data.lstYmd}</Text>
                </View>)) 
                : <View><Text>검색 결과가 없습니다.</Text></View>}
            </ScrollView>
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
    },
    manageArea: {
        padding: 10,
        alignItems: 'center',
    },
    manageText: {
        fontSize: 17,
        color: 'red'
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultView: {
        border: '1px solid black',
        marginBottom: '10px',
    }
});

export default PoliceFind;