import axios from 'axios';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const ItemInfo = ({route}) => {
    const [detailInfo, setDetailInfo] = useState([]);
    const url = "https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo"
    const key = "AyubNIaSXmtsRH6lOKHbuLlh8x6KqA4zoQfyNVcQ1lRTV8IMnkd7MCaUDNGYgEwlAciphXq1EWORmpQkOISXSg%3D%3D";
    const param = {
        ATC_ID : route.params.atcId,
    };
    const searchUrl = url + '?serviceKey='+ key + '&' + new URLSearchParams(param);

    const getDetailInfo = async() => {
        try{
            const response = await axios.get(searchUrl);
            let detailJson = JSON.stringify(response.data.response.body.item);
            console.log("detailJson: "+detailJson);
            setDetailInfo(JSON.parse(detailJson));
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        console.log("route.params: "+route.params);
        getDetailInfo();
        console.log("lstFilePathImg: "+detailInfo.lstFilePathImg);
    },[]);
    return (
        <View>
            <Text>{detailInfo.lstLctNm} {detailInfo.lstPlace}</Text>
            <Text>{detailInfo.lstYmd}</Text>
            <Text>{detailInfo.prdtClNm}</Text>
            <Text>{detailInfo.lstSbjt}</Text>
            <Text>{detailInfo.lstPrdtNm}</Text>
            <Image source={{uri : detailInfo.lstFilePathImg}} style={{ width: 100, height: 100 }}/>
            <Text>{detailInfo.orgNm} {detailInfo.tel}</Text>
            <Text>{detailInfo.uniq}</Text>
        </View>
    );
};

export default ItemInfo;