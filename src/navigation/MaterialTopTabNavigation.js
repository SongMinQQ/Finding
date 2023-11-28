import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import LostBoard from '../MessageBoard/LostBoard';
import FindBoard from '../MessageBoard/FindBoard';
import { BackHandler, ToastAndroid } from 'react-native';
import { useState, useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabNavigation = () => {
    const [backPressCount, setBackPressCount] = useState(0);

     useEffect(() => {
    const backAction = () => {
        if (backPressCount === 0) {
            setBackPressCount(backPressCount + 1);
            ToastAndroid.show("뒤로 버튼을 한 번 더 누르면 종료됩니다.", ToastAndroid.SHORT);
        
        // 두 번째 뒤로 가기 버튼을 위한 타이머 설정
        setTimeout(() => {
            setBackPressCount(0);
        }, 2000); // 2초 내에 뒤로 가기 버튼을 다시 누르지 않으면 카운트를 초기화

        return true; // 이벤트 버블링을 방지
        } else {
            BackHandler.exitApp(); // 앱 종료
            return false;
        }
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove(); // 컴포넌트 언마운트 시 리스너 제거
    }, [backPressCount]);
    return (

        <Tab.Navigator>
            <Tab.Screen name='찾은 물건' component={FindBoard} />
            <Tab.Screen name='분실 물건' component={LostBoard} />
        </Tab.Navigator>

    );

};


export default MaterialTopTabNavigation;