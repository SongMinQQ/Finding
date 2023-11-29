import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { fireStoreDB } from '../../FireBase/DB';
import { storage } from '../../FireBase/DB';
import { doc, collection, arrayUnion, addDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

// 아이콘 사이즈
const ICON_CIRCLE_SIZE = WINDOW_HEIGHT * 0.15;
// 결제 완료 메세지 사이즈
const MESSAGE_FONT_SIZE = WINDOW_HEIGHT * 0.03;
// 버튼 높이
const BUTTON_HEIGHT = WINDOW_HEIGHT * 0.06;
// 버튼 너비
const BUTTON_WIDTH = WINDOW_WIDTH * 0.6;
// 버튼 텍스트 사이즈
const BUTTON_TEXT_SIZE = WINDOW_HEIGHT * 0.02;

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

const PaymentFinish = ({ navigation: { navigate }, route }) => {
    const displayName = useSelector((state) => state.displayName);
    const uid = useSelector((state) => state.UID);
    const profileImage = useSelector((state) => state.profileImg);

    const [modalVisible, setModalVisible] = useState(false);
    const [gladMessage, setGladMessage] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSave = async () => {
        console.log(gladMessage);
        const userRef = doc(fireStoreDB, "users", route.params.sellUser);
        await setDoc(userRef, {
            gladMessages: arrayUnion({
                displayName: displayName,
                uid: uid,
                itemName: route.params.itemName,
                profileImage: profileImage,
                message: gladMessage
            })
        }, { merge: true });
        closeModal();
        navigation.navigate("Home");
    };


    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.checkIconCircle}>
                <FontAwesome name="check-circle" size={ICON_CIRCLE_SIZE} color="#007bff" />
            </View>

            <Text style={styles.successMessage}>결제에 성공하였습니다!</Text>
            <Text style={styles.gladMessage}>{route.params.displayName}님에게 감사편지를 써보는건 어떨까요?</Text>

            <TouchableOpacity
                style={styles.backButton}
                onPress={openModal}
            >
                <Text style={styles.backButtonText}>감사 편지 작성하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => { navigation.navigate("Home"); }}
            >
                <Text style={styles.backButtonText}>돌아가기</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <Text style={styles.modalHeader}>감사편지 작성</Text>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    style={{ alignSelf: 'flex-start' }}>
                                    <FontAwesome name="close" size={FONT_SIZE_LARGE} color="#000" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%' }}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setGladMessage}
                                    value={gladMessage}
                                    multiline={true}
                                    placeholder="감사편지를 써주세요."
                                />
                            </View>

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>편지 보내기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checkIconCircle: {
        marginBottom: WINDOW_HEIGHT * 0.02,
    },
    successMessage: {
        fontWeight: 'bold',
        marginBottom: WINDOW_HEIGHT * 0.01,
        fontSize: MESSAGE_FONT_SIZE,
    },
    gladMessage: {
        marginBottom: WINDOW_HEIGHT * 0.06,
        fontSize: MESSAGE_FONT_SIZE * 0.6,
    },
    backButton: {
        backgroundColor: '#007bff',
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: WINDOW_HEIGHT * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: WINDOW_HEIGHT * 0.01,
    },
    backButtonText: {
        color: '#fff',
        fontSize: BUTTON_TEXT_SIZE,
        fontWeight: 'bold',
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: WINDOW_HEIGHT * 0.3,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
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

export default PaymentFinish;
