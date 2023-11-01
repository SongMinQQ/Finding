import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Chatting from '../chatting/Chatting';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Login from '../Login/Login';
import JoinMembership from '../Login/JoinMembership';
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

const Stack = createStackNavigator();

const StackNavigation = () => {
    const ref = useRef(null);
    return (
        <Stack.Navigator>
            {/* 로그인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Login" component={Login} options={{
                    headerMode: 'none'//헤더바를 숨김
                }} />
                <Stack.Screen name="Join Membership" component={JoinMembership} />
                <Stack.Screen name="Find Id" component={FindId} />
                <Stack.Screen name="Find Password" component={FindPassword} />
            </Stack.Group>
            {/* 메인 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="Home" component={BottomTabNavigation} options={{
                    title: 'Finding',
                    headerLeft: null, //뒤로가기 버튼을 없앰
                    headerRight: () => (//헤더바 오른쪽에 배치할 놈들
                        <View style={styles.headerRight}>
                            <FontAwesome name="search" size={24} color="black" style={styles.icons} />
                            <FontAwesome5 name="bell" size={24} color="black" style={styles.icons} />
                        </View>
                    )
                }} />
                <Stack.Screen name="FindBoardDetail" component={FindBoardDetail} />
                <Stack.Screen name="LostBoardDetail" component={LostBoardDetail} />
            </Stack.Group>
            {/* 프로필 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            </Stack.Group>
            {/* 결제 페이지 그룹 */}
            <Stack.Group>
                <Stack.Screen name="PaymentLegalAgree" component={PaymentLegalAgree} />
                <Stack.Screen name="PaymentCheck" component={PaymentCheck} />
                <Stack.Screen name="PaymentFinish" component={PaymentFinish} options={{
                    headerShown: false
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
    }
});

export default StackNavigation;