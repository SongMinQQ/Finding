import React from 'react';
import { View, Text, TextInput, Button , StyleSheet} from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const FindIdEmail = ({ navigation }) => {
  // TextInput 클릭 시 테두리 색 변경하는 코드
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', // 이거 바꾸면 됨
    },
  }
   // 유저 이메일 state
   const [userID, setUserID] = useState('');
   const [userEmail, setUserEmail] = useState(''); 
   const _handleUserIDChange = text => {
    setUserID(text);
  }
   const _handleUserEmailChange = text => {
     setUserEmail(text);
   }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.flexbox}>
        <Image style={styles.image} source={require('../../img/loginIcon.png')} />
        {/* 임시 로고(이미지로 만들 경우 교체해야 함) */}
        <Text style={styles.logoText}>Finding</Text>
        <Text style={[styles.logoText, { fontSize: WINDOW_HEIGHT * 0.017, marginBottom: WINDOW_HEIGHT * 0.1 }]}>이메일을 입력하시오.</Text>
        
        <TextInput style={styles.inputView}
          mode="outlined"
          placeholder='이메일'
          onChangeText={_handleUserEmailChange}
          theme={theme}
        />

            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.correctBtn}
            onPress={() => {
              navigation.navigate("Home")
              console.log(`userEmail: ${userEmail}`);
            }}
          ><Text style={{ fontWeight: 'bold', color: 'white' }}>인증번호 받으러 가기</Text>
          </TouchableOpacity>
          </View> 
          </View> 
        </SafeAreaView>
        
    );
};


export default FindPasswordEmail;

const styles = StyleSheet.create({

    flexbox: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: WINDOW_HEIGHT * 0.07,
      },
    
      container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    
      image: {
        width: WINDOW_HEIGHT * 0.1,
        height: WINDOW_HEIGHT * 0.1,
        margin: WINDOW_HEIGHT * 0.02,
      },
    
     logoText: {
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.06,
      },
      buttonContainer: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      inputView: {
        backgroundColor: "#fff",
        width: "90%",
        marginBottom: WINDOW_HEIGHT * 0.02,
      },
    
      correctBtnBtn: {
        width: "100%",
        borderRadius: 25,
        height: WINDOW_HEIGHT * 0.06,
        alignItems: "center",
        justifyContent: "center",
        marginTop: WINDOW_HEIGHT * 0.01,
        backgroundColor: "#007bff",
      },

      forgotBox: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      forgot_button: {
        margin: WINDOW_HEIGHT * 0.02,
      },
     
});