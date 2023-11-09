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
import WritePostScreen from '../MessageBoard/WritePostScreen';
import FindIdEmail from '../Login/FindIdEmail';
import FindIdPhoneNumber from '../Login/FindIdPhoneNumber';
import FindPasswordEmail from '../Login/FindPasswordEmail';
import FindPasswordPhoneNumber from '../Login/FindPasswordPhoneNumber';

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
                <Stack.Screen name="Find Id Email" component={FindIdEmail} />
                <Stack.Screen name="Find Id PhoneNumber" component={FindIdPhoneNumber} />
                <Stack.Screen name="Find Password" component={FindPassword} />
                <Stack.Screen name="Find Password Email" component={FindPasswordEmail} />
                <Stack.Screen name="Find Password PhoneNumber" component={FindPasswordPhoneNumber} />
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
                <Stack.Screen name="FindBoardDetail" component={FindBoardDetail} options={{
                    headerTitle: '찾은 물건', 
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                      },
                    headerRight: () => (
                        <View style={styles.headerRight}>
                          <FontAwesome name="exclamation-triangle" size={24} color="black" style={styles.icons} />
                        </View>
                      ),
                }} />
                <Stack.Screen name="Write" component={WritePostScreen}/>
                <Stack.Screen name="LostBoardDetail" component={LostBoardDetail} options={{
                    headerTitle: '분실한 물건', 
                    headerTintColor: 'black',
                    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트를 표시하지 않음
                    headerStyle: {
                        borderBottomWidth: 0, // 헤더바의 하단 border를 없앰
                        elevation: 0, // 안드로이드에서의 shadow 없앰
                        shadowOpacity: 0, // iOS에서의 shadow 없앰
                      },
                    headerRight: () => (
                        <View style={styles.headerRight}>
                          <FontAwesome name="exclamation-triangle" size={24} color="black" style={styles.icons} />
                        </View>
                      ),
                }}/>
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