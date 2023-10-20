import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileMain from '../profile/ProfileMain';
import ProfileFind from '../profile/ProfileFind';
import ProfileLost from '../profile/ProfileLost';
import ProfileGladMessage from '../profile/ProfileGladMessage';
const Tab = createMaterialTopTabNavigator();

const ProfileTopTabNavigation = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Text>프로필 영역</Text>
            </View>
            <Tab.Navigator>
                <Tab.Screen name="find" component={ProfileFind} />
                <Tab.Screen name="lost" component={ProfileLost} />
                <Tab.Screen name="gladmessage" component={ProfileGladMessage} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileSection: {
        height: 100, // 예시로 높이 100사용
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProfileTopTabNavigation;
