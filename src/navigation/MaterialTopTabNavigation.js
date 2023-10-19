import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import LostBoard from '../MessageBoard/LostBoard';
import FindBoard from '../MessageBoard/FindBoard';

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Lost Board' component={LostBoard}/>
            <Tab.Screen name='Find Board' component={FindBoard}/>
        </Tab.Navigator>
    );
};

export default MaterialTopTabNavigation;