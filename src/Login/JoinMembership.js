import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from axios;


const JoinMembership = () => {
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(false);

/* 
const sendverificationRequest = async (phoneNumber) => {
    const apiUrl = '  ';
    try {
        const response = await axios.post(apiUrl, { phoneNumber });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const handleVarification = async () => {
    try {
        const response = await sendverificationRequest(phoneNumber); 
    } catch (error) {
        console.error('본인인증 요청 실패:', error);
    }
};
*/

  const handleSignup = () => {
    if (id.length > 20 || password.length > 20) {
        setError('아이디와 비밀번호는 20자 이하여야 합니다.');
    } else if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
    } else {
        setError('');
    }
  };

  useEffect(() => {
    if(password == confirmPassword && (password.length > 7 && confirmPassword > 7)){
      setStatus(true);
    }
    else{
      setStatus(false);
    }
  },[password,confirmPassword]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={id}
        onChangeText={(text) => setID(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {password != confirmPassword ? <Text>비밀번호가 일치하지 않습니다.</Text> : null}
      {status == true ? <Button title="가입하기" onPress={handleSignup} /> : <Button title="가입하기" disabled = {true}/>}
      <Text style={{ color: 'red' }}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,  
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default JoinMembership;