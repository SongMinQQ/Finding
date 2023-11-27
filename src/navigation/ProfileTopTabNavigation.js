import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileMain from '../profile/ProfileMain';
import ProfileFind from '../profile/ProfileFind';
import ProfileLost from '../profile/ProfileLost';
import ProfileGladMessage from '../profile/ProfileGladMessage';

import { fireStoreDB } from '../../FireBase/DB';
import { collection, query, where, getDocs } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();

const ProfileTopTabNavigation = () => {
    const [profileImage, setProfileImage] = useState('');
    const [userName, setUserName] = useState(null);

    // const fetchUserData = async (uid) => {
    //     try {
    //         const usersRef = collection(fireStoreDB, "users");
    //         const q = query(usersRef, where("uid", "==", uid));
    //         const querySnapshot = await getDocs(q);

    //         querySnapshot.forEach((doc) => {
    //             const data = doc.data();
    //             console.log("유저 정보 불러오기 성공")
    //             setProfileImage(data.profileImageURL);
    //             setUserName(data.name);
    //         });
    //     } catch (error) {
    //         console.error("Error fetching user data: ", error);
    //     }
    // };
    // useEffect(() => {
    //     fetchUserData("Vm6cVPllNeZzZpa4KBUl5OxlHwQ2");
    // }, [])

    return (
        <View style={styles.container}>
            <ProfileMain name="홍길동" imgURL={profileImage} />
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
