import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import ProfileFind from './ProfileFind';
import ProfileLost from './ProfileLost';
import GladMessage from './GladMessage';
import ProfileMain from './ProfileMain';

const Tab = createMaterialTopTabNavigator();

const ProfileMaterialTopTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Find' component={ProfileFind}/>
            <Tab.Screen name='Lost' component={ProfileLost}/>
            <Tab.Screen name='GladMessage' component={GladMessage}/>
        </Tab.Navigator>
    );
};

export default ProfileMaterialTopTabNavigation;