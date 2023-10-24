import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProfileMain from './ProfileMain';
import ProfileMaterialTopTabNavigation from './ProfileMaterialTopTabNavigation';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserProfile" component={ProfileMain} options={{
                headerLeft:null, //뒤로가기 버튼을 없앰
                headerShown: false,
            }}/>
            <Stack.Screen name="ProfileTopTabs" component={ProfileMaterialTopTabNavigation} options={{
                // headerLeft:null, //뒤로가기 버튼을 없앰
                headerShown: false,
            }}/>
        </Stack.Navigator>
    );
};

export default ProfileStack;