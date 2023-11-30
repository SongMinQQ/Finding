import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import LostBoard from '../MessageBoard/LostBoard';
import FindBoard from '../MessageBoard/FindBoard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabNavigation = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator>
            <Tab.Screen name='습득 물건' component={FindBoard} />
            <Tab.Screen name='분실 물건' component={LostBoard} />
        </Tab.Navigator>
    );

};


export default MaterialTopTabNavigation;