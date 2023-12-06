import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import CountySelect from './CountySelect';
import CitySelect from './CitySelect';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Image } from 'expo-image';
// import { keys } from '../../key/keyCollection';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;

const PoliceFind = ({ navigation }) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCounty, setSelectedCounty] = useState('');
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
        const key = 'AyubNIaSXmtsRH6lOKHbuLlh8x6KqA4zoQfyNVcQ1lRTV8IMnkd7MCaUDNGYgEwlAciphXq1EWORmpQkOISXSg%3D%3D';
        const param = {
            LST_PLACE: `${selectedCity} ${selectedCounty}`,
            LST_PRDT_NM: searchText,
            pageNo: 1,
            numOfRows: 10
        };
        const searchUrl = reqUrl + '?serviceKey=' + key + '&' + new URLSearchParams(param);
        console.log(searchUrl);
        try {
            setLoading(true);//데이터 받아오는 중엔 로딩

            let responseData = "";
            const response = await axios.get(searchUrl)
            console.log(JSON.stringify(response.data.response.body.items.item));
            responseData = JSON.stringify(response.data.response.body.items.item);
            // let responseParseData = JSON.parse(responseData);
            console.log(response);
            if (responseData) {
                setSearchResult(JSON.parse(responseData))
            }
            // else if(response.data.response.body.items.length == 1){
            //     setSearchResult()
            // }
            else {
                setSearchResult([]);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false); // 로딩 완료 시 로딩 상태 업데이트
        }
    }

    return (
        <View style={styles.container}>
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
                    placeholderTextColor={'#585858'}
                />
                <TouchableOpacity onPress={search}>
                    <EvilIcons name="search" size={WINDOW_HEIGHT * 0.05} color="black" />
                </TouchableOpacity>
            </View>
            {loading &&
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>}
            <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1 }}>
                {searchResult.length > 0 ? searchResult.map((data, index) => (
                    <TouchableOpacity key={index}
                        style={styles.resultView}
                        onPress={() => navigation.navigate("ItemInformation",
                            { atcId: data.atcId })}>
                        <Image source={{ uri: "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif" }} style={styles.itemImage} />
                        <View style={styles.textContainer}>
                            <Text>카테고리 : {data.prdtClNm}</Text>
                            <Text>분실물 : {data.lstPrdtNm}</Text>
                            <Text>습득 장소 : {data.lstPlace}</Text>
                            <Text>등록 일자 : {data.lstYmd}</Text>
                        </View>
                    </TouchableOpacity>))
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#888888', }}>검색 결과가 없습니다.</Text>
                    </View>}
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
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        height: WINDOW_HEIGHT * 0.05,
        borderRadius: WINDOW_HEIGHT * 0.008,
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
    itemImage: {
        width: ITEM_SIZE * 0.8,
        height: ITEM_SIZE * 0.8,
        borderRadius: ITEM_BORDER_RADIUS,
    },
    textContainer: {
        flex: 1,
        height: '100%',
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    resultView: {
        width: '100%',
        height: ITEM_SIZE,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: '#F8F8F8',
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        padding: 10,
    }
});

export default PoliceFind;