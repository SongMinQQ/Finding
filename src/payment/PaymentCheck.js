import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import PaymentMain from './PaymentMain';
import PaymentInfo from './PaymentInfo';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';

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



const PaymentCheck = ({ navigation: { navigate }, route }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const displayName = useSelector((state) => state.displayName);
    const uid = useSelector((state) => state.UID);
    const profileImage = useSelector((state) => state.profileImg);

    // 결제 성공 카드 번호: 4242 4242 4242 4242
    // 인증 부족 카드 번호: 4000 0025 0000 3155
    // 잔액 부족 카드 번호: 4000 0000 0000 9995
    // 카드 사용 기한은 적절하게 넣어야 함. 막 20년, 78년 이런식으로 넣으면 안돌아감(CVC는 아무거나 가능)
    const handlePayment = async () => {
        try {
            console.log('결제 세션 요청 시작');
            const response = await fetch('https://neighbouring-dormouse-beakseok.koyeb.app/create-payment-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: `key_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`,
                    itemName: `${route.params.itemName}`,
                    findLocation: `${route.params.location}`,
                    findDate: `${route.params.date}`,
                    amount: `${route.params.money}`,
                    tradeType: `${route.params.tradeType}`,
                    tradeLocation: `${route.params.tradeLocation}`,
                    deliveryInfo: '배송 정보',
                    buyUser: `${uid}`,
                    sellUSer: `${route.params.sellUser}`,
                }),
            });
            const data = await response.json();
            console.log('결제 세션 응답:', data);
            if (data.clientSecret) {
                console.log('결제 시트 초기화 시작');
                const initResult = await initPaymentSheet({
                    paymentIntentClientSecret: data.clientSecret,
                    merchantDisplayName: 'finding',
                });
                console.log('결제 시트 초기화 결과:', initResult);
                const { error } = await presentPaymentSheet();
                console.log('결제 시트 표시 완료', error ? error : 'No error');
                if (!error) {
                    await fetchPaymentDetails(data.clientSecret.split('_secret')[0]);
                    navigate('PaymentFinish');
                } else {
                    console.log('결제 시트 오류:', error);
                }
            } else {
                console.error('결제 시트 초기화 실패', data.error);
            }
        } catch (error) {
            console.error('결제 요청 중 오류 발생:', error);
        }
    };

    const fetchPaymentDetails = async (paymentIntentId) => {
        try {
            const response = await fetch(`https://neighbouring-dormouse-beakseok.koyeb.app/payment-details/${paymentIntentId}`);
            const paymentDetails = await response.json();
            console.log('결제 세부 정보:', paymentDetails);
        } catch (error) {
            console.error('결제 세부 정보 조회 중 오류 발생:', error);
        }
    };

    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.container}>
                <PaymentMain
                    imgURL={route.params.imgURL}
                    itemName={route.params.itemName}
                    location={route.params.location}
                    date={route.params.date}
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
                    onPress={handlePayment}
                >
                    <Text style={styles.paymentButtonText}>결제하기</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
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
