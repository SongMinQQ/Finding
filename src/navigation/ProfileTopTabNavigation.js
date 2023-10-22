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
    }
});

export default ProfileTopTabNavigation;
