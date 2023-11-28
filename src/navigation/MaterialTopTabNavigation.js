import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import LostBoard from '../MessageBoard/LostBoard';
import FindBoard from '../MessageBoard/FindBoard';

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabNavigation = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen name='찾은 물건' component={FindBoard} />
            <Tab.Screen name='분실 물건' component={LostBoard} />
        </Tab.Navigator>

    );

};


export default MaterialTopTabNavigation;