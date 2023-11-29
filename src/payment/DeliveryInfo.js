import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// 저장
const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // 저장 오류
        console.error('Failed to save the data to the storage');
    }
};

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

// 삭제
const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // 삭제 오류
        console.error('Failed to delete the data from the storage');
    }
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const deliveryRequestList = [
    { label: '문 앞에 놓아주세요.', value: '문 앞에 놓아주세요.' },
    { label: '경비실에 맡겨주세요.', value: '경비실에 맡겨주세요.' },
    { label: '배송 전 전화해주세요.', value: '배송 전 전화해주세요.' },
];


// 제목 단위 폰트 사이즈
const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03;
// 작은 폰트 사이즈
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.015;
// 중간 폰트 사이즈
const FONT_SIZE_MEDIUM = WINDOW_HEIGHT * 0.02;
// 큰 폰트 사이즈
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.025;
// 버튼 둥근 모서리 값
const BUTTON_BORDER_RADIUS = WINDOW_HEIGHT * 0.006;
// 버튼 padding 값
const BUTTON_PADDING = WINDOW_HEIGHT * 0.01;

const DeliveryInfo = ({ deliveryName, setDeliveryName, deliveryPhoneNum, setDeliveryPhoneNum, deliveryAddress, setDeliveryAddress, thankCost, deliveryCost, setDeliveryRequest }) => {

    const theme = {
        ...DefaultTheme,
        myOwnProperty: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#007bff', // 이거 바꾸면 됨
        },
    };


    const handlePhoneNumChange = (text) => {
        // 숫자만 추출
        const numbersOnly = text.replace(/[^0-9]/g, '');

        // 숫자를 형식에 맞춰 나눔
        let formattedNumber;
        if (numbersOnly.length <= 3) {
            formattedNumber = numbersOnly;
        } else if (numbersOnly.length <= 7) {
            formattedNumber = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
        } else {
            formattedNumber = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
        }

        // 상태 업데이트
        setDeliveryPhoneNum(formattedNumber);
    };


    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSave = async () => {
        await storeData('deliveryName', deliveryName);
        await storeData('deliveryPhoneNum', deliveryPhoneNum);
        await storeData('deliveryAddress', deliveryAddress);
        setModalVisible(false);
    };

    const formattedThankCost = parseInt(thankCost).toLocaleString();
    const formattedDeliveryCost = parseInt(deliveryCost).toLocaleString();
    const totalCost = parseInt(thankCost) + parseInt(deliveryCost);
    const formattedTotalCost = totalCost.toLocaleString();
    return (
        <View>
            <View style={styles.deliverySection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.sectionTitle}>배송 정보 입력</Text>
                    <TouchableOpacity style={styles.editButton}
                        onPress={openModal}>
                        <Text style={styles.editButtonText}>정보 수정</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>받는 분</Text>
                        <Text style={styles.value}>{deliveryName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>연락처</Text>
                        <Text style={styles.value}>{deliveryPhoneNum}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>주소</Text>
                        <Text style={styles.value}>{deliveryAddress}</Text>
                    </View>
                </View>

                <PickerSelect
                    onValueChange={(value) => setDeliveryRequest(value)}
                    items={deliveryRequestList}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                        label: '배송시 요청사항 선택',
                        value: null,
                    }}
                />
            </View>

            <View style={styles.paymentSection}>
                <Text style={styles.sectionTitle}>결제 금액 확인</Text>
                <View style={styles.paymentContent}>
                    <Text style={styles.paymentInfo}>사례비 금액</Text>
                    <Text style={[styles.paymentInfo, { color: '#000000' }]}>{formattedThankCost}원</Text>
                </View>
                <View style={styles.paymentContent}>
                    <Text style={styles.paymentInfo}>배송비</Text>
                    <Text style={[styles.paymentInfo, { color: '#000000' }]}>{formattedDeliveryCost}원</Text>
                </View>
                <View style={[styles.paymentContent, { marginTop: 20 }]}>
                    <Text style={styles.TotalInfo}>총 금액</Text>
                    <Text style={styles.TotalInfo}>{formattedTotalCost}원</Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <Text style={styles.modalHeader}>배송 정보 입력</Text>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={{ alignSelf: 'flex-start' }}>
                                <FontAwesome name="close" size={FONT_SIZE_LARGE} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                onChangeText={setDeliveryName}
                                value={deliveryName}
                                theme={theme}
                                placeholder="이름"
                            />
                            <TextInput
                                mode="outlined"
                                style={styles.input}
                                onChangeText={handlePhoneNumChange}
                                value={deliveryPhoneNum}
                                theme={theme}
                                keyboardType="phone-pad"
                                placeholder="전화번호"
                            />
                            <TextInput
                                mode="outlined"
                                style={styles.input}
                                onChangeText={setDeliveryAddress}
                                value={deliveryAddress}
                                theme={theme}
                                placeholder="주소"
                            />
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    deliverySection: {
        marginTop: 10,
        borderTopWidth: 10,
        borderTopColor: '#F8F8F8',
        padding: 15,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    editButton: {
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: BUTTON_PADDING,
        borderRadius: BUTTON_BORDER_RADIUS,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_SMALL,
    },
    infoContainer: {
        paddingBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // 각 줄 사이의 간격
    },
    label: {
        fontSize: FONT_SIZE_MEDIUM,
        color: '#000',
        fontWeight: 'bold',
        width: WINDOW_HEIGHT * 0.1, // 라벨의 너비를 고정하여 값들의 시작점을 일치시킵니다.
    },
    value: {
        fontSize: FONT_SIZE_MEDIUM,
        color: '#000',
        flex: 1, // 값이 라벨 너비를 초과할 수 있도록 합니다.
    },
    requestInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#9B9B9B',
        borderRadius: WINDOW_HEIGHT * 0.005,
        padding: WINDOW_HEIGHT * 0.01,
        height: WINDOW_HEIGHT * 0.06,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    requestPlaceholder: {
        fontSize: FONT_SIZE_MEDIUM,
        color: '#9B9B9B',
    },

    paymentSection: {
        marginTop: 10,
        borderTopWidth: 10,
        borderTopColor: '#F8F8F8',
        padding: 15,
    },
    paymentContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    paymentInfo: {
        color: '#9B9B9B',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_MEDIUM,
    },
    TotalInfo: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_LARGE,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center', // 모달을 가운데로 정렬합니다.
        width: '90%', // 모달의 너비를 확장합니다.
        height: '50%', // 모달의 최대 높이를 설정합니다.
        justifyContent: 'space-between', // 모달 내부의 요소들을 세로 방향으로 가운데 정렬합니다.
    },
    modalHeader: {
        fontSize: FONT_SIZE_HEADER,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1, // 모달 컨테이너가 전체 화면을 차지하도록 설정
        justifyContent: 'center', // 수직 방향으로 중앙 정렬
        alignItems: 'center', // 가로 방향으로 중앙 정렬
    },
    input: {
        width: '100%',
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        width: '100%', // 저장 버튼의 너비를 늘립니다.
        alignItems: 'center', // 버튼 내부의 텍스트를 가운데로 정렬합니다.
    },
    saveButtonText: {
        color: "white",
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: "bold",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: WINDOW_HEIGHT * 0.055,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // iOS에서 화살표 아이콘 영역을 확보
    },
    placeholder: {
        color: '#BDBDBD',
    },
    inputAndroid: {
        height: WINDOW_HEIGHT * 0.055,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // 안드로이드에서 화살표 아이콘 영역을 확보
    },
});
export default DeliveryInfo
