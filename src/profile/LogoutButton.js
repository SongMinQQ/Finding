import { TouchableOpacity,Text } from "react-native";
import { auth } from "../../FireBase/DB";
import React from 'react';
import { signOut } from "firebase/auth";

const LogoutButton = ({navigation}) => {
    const logout = async() => {
        try {
            await signOut(auth);
            console.log('로그아웃 성공');
            navigation.navigate('Login');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    }
    return (
        <TouchableOpacity onPress={logout}>
            <Text>로그아웃</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;