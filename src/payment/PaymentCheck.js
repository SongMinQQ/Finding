import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import PaymentMain from './PaymentMain';
import PaymentInfo from './PaymentInfo';
import { useNavigation } from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

// 제목 단위 폰트 사이즈
const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03;
// 작은 폰트 사이즈
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.015;
// 중간 폰트 사이즈
const FONT_SIZE_MEDIUM = WINDOW_HEIGHT * 0.02; 
// 큰 폰트 사이즈
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.025; 
// 버튼 둥근 모서리 값
const BUTTON_BORDER_RADIUS = WINDOW_HEIGHT * 0.009;
// 버튼 padding값
const BUTTON_PADDING = WINDOW_HEIGHT * 0.01;

const PaymentCheck = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <PaymentMain
                imgURL="https://picsum.photos/id/5/200/200"
                itemName="노트북"
                category="전자기기"
                location="충남 천안시"
                date="2023-10-10"
            />
            
            <PaymentInfo
                userName="홍길동"
                userPhoneNum="010-1234-5678"
                userAdress="충남 천안시 동남구 안서동"
                thankCost="50000"
                deliveryCost="2200"
            />
            <TouchableOpacity 
                style={styles.paymentButton}
                onPress={() => { navigation.navigate("PaymentFinish"); }}
            >
                <Text style={styles.paymentButtonText}>결제하기</Text>
            </TouchableOpacity>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    paymentButton: {
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        height: WINDOW_HEIGHT * 0.05,
        borderRadius: BUTTON_BORDER_RADIUS,
    },
    paymentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_MEDIUM,
    },
});

export default PaymentCheck;
