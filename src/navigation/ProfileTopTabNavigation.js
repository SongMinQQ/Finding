import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, StyleSheet } from 'react-native';
import ProfileMain from '../profile/ProfileMain';
import ProfileFind from '../profile/ProfileFind';
import ProfileLost from '../profile/ProfileLost';
import ProfileGladMessage from '../profile/ProfileGladMessage';

import { fireStoreDB } from '../../FireBase/DB';
import { doc, deleteDoc, updateDoc, collection, arrayUnion, arrayRemove, query, where, getDoc, addDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const ProfileTopTabNavigation = ({ navigation: { navigate }, route }) => {
    const profileImage = useSelector((state) => state.profileImg);
    const uid = useSelector((state) => state.UID);
    const displayName = useSelector((state) => state.displayName);

    const [findCount, setFindCount] = useState('');

    const fetchUserCount = async () => {
        try {
            const userRef = doc(fireStoreDB, "users", uid);

            const userDoc = await getDoc(userRef);

            const userFindCount = userDoc.data().foundItemsCount ? userDoc.data().foundItemsCount:0;
            setFindCount(userFindCount);
        } catch (error) {
            console.error("Error fetching user posts: ", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUserCount();
            // 페이지가 포커스 될 때마다 실행될 로직을 여기에 작성합니다.

            return () => {
                // 포커스가 사라질 때 실행될 클린업 로직이 필요하다면 여기에 작성합니다.
            };
        }, [route.params])
    );
    return (
        <View style={styles.container}>
            <ProfileMain name={displayName} imgURL={profileImage} findCount={findCount} />
            <Tab.Navigator>
                <Tab.Screen name="습득 물건" component={ProfileFind} />
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