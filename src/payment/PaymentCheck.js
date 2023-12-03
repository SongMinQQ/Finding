import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PaymentMain from './PaymentMain';
import DeliveryInfo from './DeliveryInfo';
import MeetTradeInfo from './MeetTradeInfo';

import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { fireStoreDB } from '../../FireBase/DB';
import { storage } from '../../FireBase/DB';
import { doc, deleteDoc, updateDoc, collection, getDoc, arrayUnion, arrayRemove, addDoc, setDoc, FieldValue, increment } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

// 로드
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // 값이 존재할 경우
            return value;
        }
    } catch (e) {
        // 로드 오류
        console.error('Failed to load the data from the storage');
    }
};


const PaymentCheck = ({ navigation: { navigate }, route }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const deliveryCost = 2200;

    const displayName = useSelector((state) => state.displayName);
    const uid = useSelector((state) => state.UID);
    const profileImage = useSelector((state) => state.profileImg);

    const [deliveryName, setDeliveryName] = useState('');
    const [deliveryPhoneNum, setDeliveryPhoneNum] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryRequest, setDeliveryRequest] = useState('');

    const [meetName, setMeetName] = useState('');
    const [meetPhoneNum, setMeetPhoneNum] = useState('');

    const loadUserInfo = async () => {
        if (route.params.tradeType === '택배') {
            console.log("배달 정보 띄움");
            setDeliveryName(await getData('deliveryName') || '');
            setDeliveryPhoneNum(await getData('deliveryPhoneNum') || '');
            setDeliveryAddress(await getData('deliveryAddress') || '');
            setMeetName('');
            setMeetPhoneNum('');
        } else {
            console.log(route.params.tradeType);
            console.log("직거래 정보 띄움");
            setDeliveryName('');
            setDeliveryPhoneNum('');
            setDeliveryAddress('');
            setMeetName(await getData('meetName') || '');
            setMeetPhoneNum(await getData('meetPhoneNum') || '');
        }
    };


    const deletePost = async (postId) => {
        try {
            const postRef = doc(fireStoreDB, "findBoard", postId);

            await updateDoc(postRef, {
                isPaied: true
            });

            const userRef = doc(fireStoreDB, "users", route.params.sellUser);
            await updateDoc(userRef, {
                findPosts: arrayRemove(postId),
                foundItemsCount: increment(1)
            });
            console.log("Document successfully deleted: ", postId);
        }
        catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadUserInfo();
            // 페이지가 포커스 될 때마다 실행될 로직을 여기에 작성합니다.

            return () => {
                // 포커스가 사라질 때 실행될 클린업 로직이 필요하다면 여기에 작성합니다.
            };
        }, [route.params])
    );

    // 결제 성공 카드 번호: 4242 4242 4242 4242
    // 인증 부족 카드 번호: 4000 0025 0000 3155
    // 잔액 부족 카드 번호: 4000 0000 0000 9995
    // 카드 사용 기한은 적절하게 넣어야 함. 막 20년, 78년 이런식으로 넣으면 안돌아감(CVC는 아무거나 가능)
    const handlePayment = async () => {
        try {
            const postRef = doc(fireStoreDB, "findBoard", route.params.id);
            const isDeletedDoc = await getDoc(postRef);
            if (!isDeletedDoc.data().isPaied && !isDeletedDoc.data().isDeleted) {
                console.log('결제 세션 요청 시작');
                let paymentTotalCost;
                if (route.params.tradeType === '직거래') {
                    paymentTotalCost = route.params.money;
                } else {
                    paymentTotalCost = route.params.money + deliveryCost;
                }
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
                        amount: `${paymentTotalCost}`,
                        tradeType: `${route.params.tradeType}`,
                        tradeLocation: `${route.params.tradeLocation}`,
                        deliveryName: `${deliveryName}`,
                        deliveryPhoneNum: `${deliveryPhoneNum}`,
                        deliveryAddress: `${deliveryAddress}`,
                        deliveryRequest: `${deliveryRequest}`,
                        meetName: `${meetName}`,
                        meetPhoneNum: `${meetPhoneNum}`,
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
                        // navigate('PaymentFinish');
                        deletePost(route.params.id);
                        navigation.navigate("PaymentFinish", {
                            itemName: route.params.itemName,
                            displayName: route.params.displayName,
                            sellUser: route.params.sellUser,
                        })
                    } else {
                        console.log('결제 시트 오류:', error);
                    }
                } else {
                    console.error('결제 시트 초기화 실패', data.error);
                }
            } else {
                Alert.alert('이미 결제되었거나 삭제된 게시물입니다.');
                navigation.navigate('Home');
            }




        } catch (error) {
            console.error('결제 요청 중 오류 발생:', error);
        }
    };

    const fetchPaymentDetails = async (paymentIntentId) => {
        try {
            const response = await fetch(`https://neighbouring-dormouse-beakseok.koyeb.app/payment-details/${paymentIntentId}`);
            const paymentDetails = await response.json();
            const metadata = paymentDetails.metadata;

            const paymentContent = {
                key: metadata.key,
                amount: paymentDetails.amount,
                description: paymentDetails.description,
                itemName: metadata.itemName,
                paymentDate: metadata.paymentDate,
                buyUser: metadata.buyUser,
                sellUser: metadata.sellUSer,
                findLocation: metadata.findLocation,
                findDate: metadata.findDate,
                tradeType: metadata.tradeType,
                tradeLocation: metadata.tradeLocation,
                meetName: metadata.meetName,
                meetPhoneNum: metadata.meetPhoneNum,
                deliveryName: metadata.deliveryName,
                deliveryPhoneNum: metadata.deliveryPhoneNum,
                deliveryAddress: metadata.deliveryAddress,
                deliveryRequest: metadata.deliveryRequest,
            };

            const docRef = await addDoc(collection(fireStoreDB, "paymentInfo"), {
                ...paymentContent,
            });
            console.log("Document written with ID: ", docRef.id);


        } catch (error) {
            console.error('결제 세부 정보 조회 중 오류 발생:', error);
        }
    };

    const navigation = useNavigation();
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <PaymentMain
                    imgURL={route.params.imgURL}
                    itemName={route.params.itemName}
                    location={route.params.location}
                    date={route.params.date}
                />
                {route.params.tradeType === '직거래' ?
                    (<MeetTradeInfo
                        thankCost={route.params.money}
                        meetName={meetName}
                        meetPhoneNum={meetPhoneNum}
                        setMeetName={setMeetName}
                        setMeetPhoneNum={setMeetPhoneNum}
                    />) :
                    (<DeliveryInfo
                        thankCost={route.params.money}
                        deliveryCost={deliveryCost}
                        deliveryName={deliveryName}
                        deliveryPhoneNum={deliveryPhoneNum}
                        deliveryAddress={deliveryAddress}
                        setDeliveryName={setDeliveryName}
                        setDeliveryPhoneNum={setDeliveryPhoneNum}
                        setDeliveryAddress={setDeliveryAddress}
                        setDeliveryRequest={setDeliveryRequest}
                    />)}
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
