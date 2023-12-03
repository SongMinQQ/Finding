import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import OpponentProfileMain from './OpponentProfileMain';
import OpponentProfileFind from './OpponentProfileFind';
import OpponentProfileLost from './OpponentProfileLost';
import OpponentProfileGladMessage from './OpponentProfileGladMessage';

import { fireStoreDB } from '../../FireBase/DB';
import { doc,getDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const OpponentProfileTopTabNavigation = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();
    const [findCount, setFindCount] = useState('');

    const fetchUserCount = async () => {
        try {
            const userRef = doc(fireStoreDB, "users", route.params.opponentUserID);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userFindCount = userDoc.data().foundItemsCount;
                if(userFindCount){
                    setFindCount(userFindCount);
                }else{
                    setFindCount(0);
                }
            }else {
                console.log("찾아준 횟수가 존재하지 않습니다.");
                setFindCount(0);
            }

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
            <OpponentProfileMain name={route.params.displayName} imgURL={route.params.profileImage} findCount={findCount} />
            <Tab.Navigator>
                <Tab.Screen name="습득 물건" children={() => <OpponentProfileFind opponentUserID={route.params.opponentUserID} />}/>
                <Tab.Screen name="분실 물건" children={() => <OpponentProfileLost opponentUserID={route.params.opponentUserID} />}/>
                <Tab.Screen name="감사 편지" children={() => <OpponentProfileGladMessage opponentUserID={route.params.opponentUserID} />}/>
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default OpponentProfileTopTabNavigation;