import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileMain = () => {
    return (
        <View style={styles.profileSection}>
            <Text>프로필 영역</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    profileSection: {
        height: 100, // 예시로 높이 100사용
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProfileMain;