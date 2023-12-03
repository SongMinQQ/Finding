import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { TextInput } from 'react-native-paper';
import theme from '../PaperTheme';

import { auth } from '../../FireBase/DB';
import { sendPasswordResetEmail } from 'firebase/auth';

const WINDOW_HEIGHT = Dimensions.get('window').height;


const FindPassword = ({ navigation }) => {


  const [userEmail, setUserEmail] = useState('');
  const _handleUserEmailChange = text => {
    setUserEmail(text);
  }

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, userEmail);
      navigation.navigate('FindPasswordComplete');
      console.log(userEmail);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };


  return (
    <View style={styles.flexbox}>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={styles.columnSelectBox}>
          <Text style={styles.headerText}>이메일을 입력해주세요.</Text>
          <Text style={styles.titleText}>비밀번호 재설정 이메일을 보내드리겠습니다.</Text>
        </View>
        <TextInput style={styles.inputView}
          mode="outlined"
          placeholder='이메일'
          keyboardType="email-address"
          onChangeText={_handleUserEmailChange}
          theme={theme}
        />
      </View>


      <TouchableOpacity style={styles.correctBtn}
        onPress={handlePasswordReset}
      ><Text style={{ fontWeight: 'bold', color: 'white' }}>비밀번호 재설정하기</Text>
      </TouchableOpacity>

    </View>

  );
};

export default FindPassword;


const styles = StyleSheet.create({
  flexbox: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: WINDOW_HEIGHT * 0.03,
    paddingBottom: 50,
  },
  columnSelectBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
    height: WINDOW_HEIGHT * 0.07,
    marginBottom: 30,
  },
  headerText: {
    fontSize: WINDOW_HEIGHT * 0.03,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleText: {
    fontSize: WINDOW_HEIGHT * 0.02,
  },
  inputView: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: WINDOW_HEIGHT * 0.01,
  },

  correctBtn: {
    width: "90%",
    borderRadius: 5,
    height: WINDOW_HEIGHT * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: WINDOW_HEIGHT * 0.02,
    backgroundColor: "#007bff",
  },


});