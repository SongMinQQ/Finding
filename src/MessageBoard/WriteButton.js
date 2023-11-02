import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const WriteButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Write")} >
                <Text style={styles.addButtonText}>글쓰기</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'fixed',
        width: 60,
        height: 60,
        bottom: 70,
        left: 300,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 100
    },
    addButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute', // 절대 위치 지정
        top: '50%', // 세로 중앙 정렬
        left: '50%', // 가로 중앙 정렬
        //transform: [{ translateX: '-50%' }, { translateY: '-50%' }] // 중앙 정렬 조정
    }
})
export default WriteButton;