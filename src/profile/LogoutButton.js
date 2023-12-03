import React from 'react';
import { TouchableOpacity,Text } from "react-native";
import { auth } from "../../FireBase/DB";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LogoutButton = () => {
    const navigation = useNavigation();
    const logout = async() => {
        try {
            await signOut(auth);
            console.log('로그아웃 성공');
            //navigation.navigate('Login');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    }
    return (
        <TouchableOpacity onPress={logout}>
            <Text style={{color: '#ff0000'}}>로그아웃</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;