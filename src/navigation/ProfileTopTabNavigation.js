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
            <ProfileMain />
            <Tab.Navigator>
                <Tab.Screen name="찾은 물건" component={ProfileFind} />
                <Tab.Screen name="분실 물건" component={ProfileLost} />
                <Tab.Screen name="감사 편지" component={ProfileGladMessage} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ProfileTopTabNavigation;
