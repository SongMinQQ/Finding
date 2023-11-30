import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useRef } from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import Chatting from '../chatting/Chatting';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Login from '../Login/Login';
import JoinMembership from '../Login/JoinMembership';
import JoinMembershipSecondScreen from '../Login/JoinMembershipSecondScreen';
import JoinMembershipThirdScreen from '../Login/JoinMembershipThirdScreen';
import FindId from '../Login/FindId';
import FindPassword from '../Login/FindPassword';
import MaterialTopTabNavigation from './MaterialTopTabNavigation';
import PoliceFind from '../police/PoliceFind';
import BottomTabNavigation from './BottomTabNavigation';
import ProfileEdit from '../profile/ProfileEdit';
import FindBoardDetail from '../MessageBoard/FindBoardDetail';
import LostBoardDetail from '../MessageBoard/LostBoardDetail';
import PaymentLegalAgree from '../payment/PaymentLegalAgree';
import PaymentCheck from '../payment/PaymentCheck';
import PaymentFinish from '../payment/PaymentFinish';
import WritePostFindScreen from '../MessageBoard/WritePostFindScreen';
import WritePostLostScreen from '../MessageBoard/WritePostLostScreen';
import FindIdEmail from '../Login/FindIdEmail';
import FindIdPhoneNumber from '../Login/FindIdPhoneNumber';
import FindPasswordEmail from '../Login/FindPasswordEmail';
import FindPasswordPhoneNumber from '../Login/FindPasswordPhoneNumber';
import SearchPage from '../MessageBoard/SearchPage';
import ItemInfo from '../police/ItemInfo';
import { LoadingContext } from '../Loading/LoadingContext';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const StackNavigation = () => {
    const { loading } = useContext(LoadingContext);
    const ref = useRef(null);
    const opponentDisplayName = useSelector((state) => state.opponentDisplayName);

    return (
        <Stack.Navigator>
            {/* 로그인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Login" component={Login} options={{
                    headerMode: 'none'//헤더바를 숨김
                }} />
                <Stack.Screen name="Join Membership" component={JoinMembership} options={{
                    headerTitle: '회원가입',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="Join Membership Second" component={JoinMembershipSecondScreen} options={{
                    headerTitle: '회원가입',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="Join Membership Third" component={JoinMembershipThirdScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Find Id" component={FindId} options={{
                    headerTitle: '아이디 찾기',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="Find Password" component={FindPassword} options={{
                    headerTitle: '비밀번호 찾기',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
            </Stack.Group>
            {/* 메인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabNavigation} options={{
                    title: 'Finding',
                    headerLeft: null, 
                }} />
                <Stack.Screen name="FindBoardDetail" component={FindBoardDetail} options={{
                    headerTitle: '습득 물건',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                {/* 찾은 물건 글쓰기*/}
                <Stack.Screen name="WritePostFindScreen" component={WritePostFindScreen} options={{
                    headerTitle: '글쓰기',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                {/* 분실 물건 글쓰기*/}
                <Stack.Screen name="WritePostLostScreen" component={WritePostLostScreen} options={{
                    headerTitle: '글쓰기',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="LostBoardDetail" component={LostBoardDetail} options={{
                    headerTitle: '분실한 물건',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen
                    name="Search" component={SearchPage} options={{
                        headerTintColor: 'black',
                        headerBackTitleVisible: false,
                    }}
                />
            </Stack.Group>
            {/* 프로필 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            </Stack.Group>
            {/* 결제 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="PaymentLegalAgree" component={PaymentLegalAgree} options={{
                    headerTitle: '법률 동의',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="PaymentCheck" component={PaymentCheck} options={{
                    headerTitle: '결제 확인',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
                <Stack.Screen name="PaymentFinish" component={PaymentFinish} options={{
                    headerShown: false
                }} />
            </Stack.Group>
            {/* 분실물 자세히보기 페이지 */}
            <Stack.Group>
                <Stack.Screen name="ItemInformation" component={ItemInfo} options={{
                    headerTitle: '자세히 보기',
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    },
                }} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="Chatting" component={Chatting} options={{
                    headerTitle: opponentDisplayName,
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                    }
                }} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        marginRight: 10,
    },
    
});

export default StackNavigation;