import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialTopTabNavigation from './MaterialTopTabNavigation';
import PoliceFind from '../police/PoliceFind';
import ProfileMain from '../profile/ProfileMain';
import ProfileTopTabNavigation from './ProfileTopTabNavigation';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Board' component={MaterialTopTabNavigation} options={{
                headerShown: false //이거 없으면 헤더바가 생김여;;
            }}/>
            <Tab.Screen name='PoliceFind' component={PoliceFind} options={{
                headerShown: false
            }}/>
            <Tab.Screen name="Profile" component={ProfileTopTabNavigation} options={{
                headerShown: false
            }}/>
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;