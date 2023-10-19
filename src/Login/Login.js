// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({navigation}) => {
    // const navigation = useNavigation();
    return (
        <View>
            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text>메인페이지로</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Join Membership")}><Text>회원가입으로</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Find Id")}><Text>아이디찾기로</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Find Password")}><Text>비밀번호찾기로</Text></TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

export default Login;