import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Appearance } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const WINDOW_HEIGHT = Dimensions.get('window').height;
const MAIN_SELECT_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.18;
const WritePostScreen = ({ navigation }) => {
    const theme = {
        ...DefaultTheme,
        myOwnProperty: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#007bff', // 이거 바꾸면 됨
        },
    };

    const [title, setTitle] = useState('');

    const [location, setLocation] = useState('');

    const [description, setDescription] = useState('');

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
                            value={title}
                            onChangeText={text => setTitle(text)}
                            theme={theme}
                        />
                        <TextInput
                            mode="flat"
                            style={styles.textInput}
                            placeholder="찾은 곳"
                            value={location}
                            onChangeText={text => setLocation(text)}
                            theme={theme}
                        />
                        <TextInput
                            mode="flat"
                            style={styles.textInput}
                            placeholder="획득 일"
                            value={date ? date.toLocaleDateString('ko-KR') : "획득 일"}
                            onFocus={showDatePicker} // TextInput에 포커스되면 날짜 선택기 표시
                            theme={theme}
                        />
                    </View>
                </View>
                <View style={styles.requireSelectLayout}>
                    <View style={styles.requireInfoBox}>
                        <FontAwesome5 name="comment-dollar" size={60} color={'#585858'}/>
                        <TextInput
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="사례금"
                            value={location}
                            onChangeText={text => setLocation(text)}
                            theme={theme}
                        />
                    </View>
                    <View style={styles.requireInfoBox}>
                        <FontAwesome5 name="comment-dollar" size={60} color={'#585858'}/>
                        <TextInput
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="거래 방법"
                            value={location}
                            onChangeText={text => setLocation(text)}
                            theme={theme}
                        />
                    </View>
                    <View style={styles.requireInfoBox}>
                        <FontAwesome5 name="comment-dollar" size={60} color={'#585858'}/>
                        <TextInput
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="거래 장소"
                            value={location}
                            onChangeText={text => setLocation(text)}
                            theme={theme}
                        />
                    </View>
                </View>
                <TextInput
                    style={[styles.textInput, { height: 150 }]}
                    mode='outlined'
                    multiline
                    placeholder="자세한 설명"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    theme={theme}
                />

                <Button
                    title="글 작성 완료" onPress={handleSubmit}
                />

            </ScrollView >
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="ko-KR"
            />

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
    requireSelectLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: MAIN_SELECT_LAYOUT_HEIGHT,
        width: '100%',
        marginBottom: 10,
    },
    requireInfoBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

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

export default WritePostScreen;
