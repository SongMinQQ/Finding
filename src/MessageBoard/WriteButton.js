import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Platform } from 'react-native';

const WriteButton = ({ type }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (type === 'find') {
            navigation.navigate("WritePostFindScreen");
        } else if (type === 'lost') {
            navigation.navigate("WritePostLostScreen");
        }
    };

    return (
        <TouchableOpacity style={styles.addButton} onPress={handlePress} >
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute', // React Native에서는 'fixed' 대신 'absolute'를 사용
        width: 60,
        height: 60,
        bottom: 20,
        right: 20,
        backgroundColor: 'blue',
        borderRadius: 30, // 원 모양을 만들기 위해 width/2 값을 사용
        alignItems: 'center', // 가로 중앙 정렬을 위해 추가
        justifyContent: 'center', // 세로 중앙 정렬을 위해 추가
        ...Platform.select({
            ios: {
                shadowColor: '#000', // iOS에서 그림자 색상
                shadowOffset: { width: 0, height: 5 }, // iOS에서 그림자 위치
                shadowOpacity: 0.5, // iOS에서 그림자 투명도
                shadowRadius: 3.84, // iOS에서 그림자 둥글
            },
            android: {
                elevation: 8, // 안드로이드에서 그림자 효과
            },
        }),
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
    }
})
export default WriteButton;