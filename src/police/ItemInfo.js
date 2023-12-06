import axios from 'axios';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
// import { keys } from '../../key/keyCollection';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ItemInfo = ({ route }) => {
    const [detailInfo, setDetailInfo] = useState([]);
    const url = "https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo"
    const key = 'AyubNIaSXmtsRH6lOKHbuLlh8x6KqA4zoQfyNVcQ1lRTV8IMnkd7MCaUDNGYgEwlAciphXq1EWORmpQkOISXSg%3D%3D';
    const param = {
        ATC_ID: route.params.atcId,
    };
    const searchUrl = url + '?serviceKey=' + key + '&' + new URLSearchParams(param);

    const getDetailInfo = async () => {
        try {
            const response = await axios.get(searchUrl);
            let detailJson = JSON.stringify(response.data.response.body.item);
            console.log("detailJson: " + detailJson);
            setDetailInfo(JSON.parse(detailJson));
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        console.log("route.params: " + route.params);
        getDetailInfo();
        console.log("lstFilePathImg: " + detailInfo.lstFilePathImg);
    }, []);
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>

                <Image source={{ uri: detailInfo.lstFilePathImg }} style={styles.articleImg} />
                <Text style={styles.articleName}>{detailInfo.lstPrdtNm}</Text>
                <View style={styles.articleRow}>
                    <Text style={styles.articleKind}>카테고리</Text>
                    <View style={styles.articleLine} />
                    <Text style={styles.articleText}>{detailInfo.prdtClNm}</Text>
                </View>
                <View style={styles.articleRow}>
                    <Text style={styles.articleKind}>분실지역</Text>
                    <View style={styles.articleLine} />
                    <Text style={styles.articleText}>{detailInfo.lstLctNm} {detailInfo.lstPlace}</Text>
                </View>
                <View style={styles.articleRow}>
                    <Text style={styles.articleKind}>분실일자</Text>
                    <View style={styles.articleLine} />
                    <Text style={styles.articleText}>{detailInfo.lstYmd}</Text>
                </View>

                <View style={styles.articleRow}>
                    <Text style={styles.articleKind}>관할관서</Text>
                    <View style={styles.articleLine} />
                    <Text style={styles.articleText}>{detailInfo.orgNm} {detailInfo.tel}</Text>
                </View>
                <View style={styles.articleRow}>
                    <Text style={styles.articleKind}>습득장소</Text>
                    <View style={styles.articleLine} />
                    <Text style={styles.articleText}>{detailInfo.lstPlaceSeNm}</Text>
                </View>
                <Text style={{ fontSize: WINDOW_HEIGHT * 0.02, marginBottom: 10 }}>내 용</Text>
                <Text style={styles.articleContent}>{detailInfo.lstSbjt}</Text>
                {/* <Text>{detailInfo.uniq}</Text> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: 10,
    },
    articleImg: {
        width: '100%',
        height: WINDOW_HEIGHT * 0.27,
        borderRadius: 10,
        marginBottom: 10,
    },
    articleName: {
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.035,
        marginBottom: 5,
    },
    articleKind: {
        flex: 1,
        fontSize: WINDOW_HEIGHT * 0.02,
    },
    articleText: {
        flex: 4,
        fontSize: WINDOW_HEIGHT * 0.02,
        paddingLeft: 10,
    },
    articleContent: {
        width: '100%',
        height: WINDOW_HEIGHT * 0.13,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
    },
    articleRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    articleLine: {
        backgroundColor: '#000',
        height: WINDOW_HEIGHT * 0.02,
        width: 1.5,
    },
    linkButton: {
        width: '100%',
        height: WINDOW_HEIGHT * 0.05,
        backgroundColor: '#007bff',
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        fontSize: WINDOW_HEIGHT * 0.02,
        fontWeight: 'bold',
        color: '#fff',
    }
})

export default ItemInfo;