import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;

// 상수 정의
const PROFILE_SECTION_HEIGHT = windowHeight * 0.15;
const PROFILE_SECTION_PADDING = windowHeight * 0.015;
const PROFILE_IMAGE_SIZE = windowHeight * 0.1;
const PROFILE_IMAGE_MARGIN_RIGHT = windowHeight * 0.03;
const FONT_SIZE_MEDIUM = windowHeight * 0.025;
const FONT_SIZE_SMALL = windowHeight * 0.02;

const ProfileMain = () => {
    return (
        <View style={styles.profileSection}>
            <Image 
                source={{ uri: 'https://picsum.photos/200/200' }} 
                style={styles.profileImage}
            />
            <View style={styles.userInfo}>
                <Text style={styles.textMedium}>홍길동</Text>
                <Text style={styles.textSmall}>지역: 천안</Text>
                <Text style={styles.textSmall}>찾아준 횟수: 15</Text>
            </View>
            <TouchableOpacity>
                <Icon name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        flexDirection: 'row',
        height: PROFILE_SECTION_HEIGHT,
        padding: PROFILE_SECTION_PADDING,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        marginRight: PROFILE_IMAGE_MARGIN_RIGHT
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    textMedium: {
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textSmall: {
        fontSize: FONT_SIZE_SMALL,
        marginBottom: 5
    }
});

export default ProfileMain;
