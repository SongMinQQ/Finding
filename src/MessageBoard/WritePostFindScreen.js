import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Appearance, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PickerSelect from 'react-native-picker-select';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const MAIN_SELECT_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.18;
const ICON_AREA_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.1;
const WritePostFindScreen = ({ navigation }) => {
    const theme = {
        ...DefaultTheme,
        myOwnProperty: true,
        colors: {
            ...DefaultTheme.colors,
            text: '#FF0000',
            primary: '#007bff', // 이거 바꾸면 됨
        },
    };

    const [title, setTitle] = useState('');

    const [findLocation, setFindLocation] = useState('');
    const [tradeLocation, setTradeLocation] = useState('');

    const [description, setDescription] = useState('');

    const moneyList = [
        { label: '필요없음', value: 'noMoney' },
        { label: '1만원 이하', value: 'money1' },
        { label: '1~3만원', value: 'money1to3' },
        { label: '3~5만원', value: 'money3to5' },
        { label: '5만원 이상', value: 'money5over' },
    ];

    const tradeList = [
        { label: '직거래', value: 'meetTrade' },
        { label: '택배', value: 'deliveryTrade' },
    ];

    //image  address
    const [imageUrl, setImageUrl] = useState('');
    //권한 요청
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };


    const uploadImage = async () => {
        // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }
        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1]
        });
        if (result.cancelled) {
            return null; // 이미지 업로드 취소한 경우
        }
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        console.log(result);
        setImageUrl(result.assets[0].uri);
    };

    const handleSubmit = () => {
        // 글 작성 완료
        navigation.navigate('Home');
    };

    //모달 관련 함수, 상태변수
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.mainSelectLayout}>
                    <TouchableOpacity onPress={uploadImage}>
                        <Image
                            source={imageUrl ? { uri: imageUrl } : require('../../img/imageSelectDefault.png')}
                            style={styles.mainImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.mainInfo}>
                        <TextInput
                            mode="flat"
                            style={styles.textInput}
                            placeholder="분실물 이름"
                            textColor='#000'
                            value={title}
                            onChangeText={text => setTitle(text)}
                            theme={{ colors: { onSurfaceVariant: '#BDBDBD'} }}
                            activeUnderlineColor="#000"
                        />
                        <TextInput
                            mode="flat"
                            style={styles.textInput}
                            placeholder="찾은 곳"
                            textColor='#000'
                            value={findLocation}
                            onChangeText={text => setFindLocation(text)}
                            theme={{ colors: { onSurfaceVariant: '#BDBDBD'} }}
                            activeUnderlineColor="#000"
                        />
                        <TextInput
                            mode="flat"
                            style={styles.textInput}
                            placeholder="획득 일"
                            textColor='#000'
                            value={date ? date.toLocaleDateString('ko-KR') : ""}
                            onFocus={showDatePicker}
                            theme={{ colors: { onSurfaceVariant: '#BDBDBD'} }}
                            activeUnderlineColor="#000"
                            onPressIn={openModal}
                        />
                    </View>
                </View>
                <View style={styles.requireSelectLayout}>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <FontAwesome name="dollar" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>

                        <PickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={moneyList}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{
                                label: '사례금 선택',
                                value: null,
                            }}
                        />
                    </View>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <FontAwesome5 name="handshake" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>
                        <PickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={tradeList}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{
                                label: '거래 방법 선택',
                                value: null,
                            }}
                        />
                    </View>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <Ionicons name="location" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>
                        <TextInput
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="거래 장소"
                            value={tradeLocation}
                            onChangeText={text => setTradeLocation(text)}
                            theme={{ colors: { onSurfaceVariant: '#BDBDBD'} }}
                            activeOutlineColor="#000"
                        />
                    </View>
                </View>
                <TextInput
                    style={[styles.textInput, { height: WINDOW_HEIGHT * 0.25 }]}
                    mode='outlined'
                    multiline
                    placeholder="자세한 설명"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    theme={{ colors: { onSurfaceVariant: '#BDBDBD'} }}
                    activeOutlineColor="#000"
                />

                <TouchableOpacity style={styles.completeButton} onPress={handleSubmit}>
                    <Text style={{fontWeight:'bold', color:"#fff", fontSize: WINDOW_HEIGHT * 0.017}}>글 작성 완료</Text>
                </TouchableOpacity>
                {Platform.OS === 'ios' ? <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="ko-KR"
            /> :
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date" // 또는 "time", "datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="ko-KR"
                // display = "calendar"
                // value={new Date()}
                // display="default"
            />}
            </ScrollView >
            {/* {modal && <DatePicker visible={modal} hideModal={closeModal}/>} */}
            


        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    mainSelectLayout: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: MAIN_SELECT_LAYOUT_HEIGHT,
        width: '100%',
        marginBottom: 10,
    },
    iconArea: {
        alignItems: 'center',
        justifyContent: 'center',
        width: ICON_AREA_LAYOUT_HEIGHT,
        height: ICON_AREA_LAYOUT_HEIGHT,
        borderRadius: ICON_AREA_LAYOUT_HEIGHT / 2,
        borderWidth: 5,
        borderColor: '#000',
        marginBottom: 10,
    },
    requireSelectLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: MAIN_SELECT_LAYOUT_HEIGHT,
        width: '100%',
        marginBottom: 10,
        gap: 5,
    },
    requireInfoBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

    },
    completeButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#007bff",
        height: WINDOW_HEIGHT * 0.05,
        borderRadius: WINDOW_HEIGHT * 0.008,
        marginTop: 10,
    },
    mainImage: {
        width: MAIN_SELECT_LAYOUT_HEIGHT,
        height: MAIN_SELECT_LAYOUT_HEIGHT,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DADADA',
    },
    mainInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        height: WINDOW_HEIGHT* 0.055,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: WINDOW_HEIGHT* 0.055,
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
        height: WINDOW_HEIGHT* 0.055,
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

export default WritePostFindScreen;
