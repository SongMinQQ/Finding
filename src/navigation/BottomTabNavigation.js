import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialTopTabNavigation from './MaterialTopTabNavigation';
import PoliceFind from '../police/PoliceFind';
import ProfileMain from '../profile/ProfileMain';
import ProfileTopTabNavigation from './ProfileTopTabNavigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ChattingChannels from '../chatting/ChattingChannels';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();

    const handleSearch = () => {
        console.log("검색 클릭");
        navigation.navigate("Search");
    }
    useEffect(() => {
        console.log("아이콘 띄우기");
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSearch}>
                    <FontAwesome name="search" size={24} color="black" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <Tab.Navigator>
            <Tab.Screen name='게시판' component={MaterialTopTabNavigation} options={{
                headerShown: false, //이거 없으면 헤더바가 생김여;;
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="file-find" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name='Lost112' component={PoliceFind} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="police-badge" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="채팅" component={ChattingChannels} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="chat" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="프로필" component={ProfileTopTabNavigation} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="user-alt" size={size} color={color} />
                ),
            }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;