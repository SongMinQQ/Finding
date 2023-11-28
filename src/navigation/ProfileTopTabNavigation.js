import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileMain from '../profile/ProfileMain';
import ProfileFind from '../profile/ProfileFind';
import ProfileLost from '../profile/ProfileLost';
import ProfileGladMessage from '../profile/ProfileGladMessage';

import { fireStoreDB } from '../../FireBase/DB';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const ProfileTopTabNavigation = () => {
    const profileImage = useSelector((state) => state.profileImg);
    const uid = useSelector((state) => state.UID);
    const displayName = useSelector((state) => state.displayName);

    return (
        <View style={styles.container}>
            <ProfileMain name={displayName} imgURL={profileImage} />
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