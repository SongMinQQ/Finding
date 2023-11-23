// import React, { useEffect, useState } from 'react';
// import styled from "styled-components";
// import { View, Text, TextInput, Button, StyleSheet, Touchable, Keyboard, TouchableOpacity } from 'react-native';
// import { StackActions } from '@react-navigation/native';
// import { TouchableWithoutFeedback } from 'react-native-web';
// // import axios from axios;


// const JoinMembership = () => {
//   const [id, setID] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [birth, setBirth] = useState('');
//   const [error, setError] = useState('');
//   const [status, setStatus] = useState(false);

// /* 
// const sendverificationRequest = async (phoneNumber) => {
//     const apiUrl = '  ';
//     try {
//         const response = await axios.post(apiUrl, { phoneNumber });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// const handleVarification = async () => {
//     try {
//         const response = await sendverificationRequest(phoneNumber); 
//     } catch (error) {
//         console.error('본인인증 요청 실패:', error);
//     }
// };
// */

//   const handleSignup = async () => {
//     const { value: email } = setEmail;
//     const { value: name } = setName;
//     const { value: id } = setID;
//     const { value: password } = setPassword;
//     const { value: birth } = setBirth;

//     await Auth.JoinMembership({
//       id: id,
//       password: password,
//       name: name,
//       attributes: {
//         email: email,
//         birth: birth,
//       }  
//     });
    
//     navigation.dispatch(StackActions.replace("Confirm", { name, password, fromLogin: false }));

//     if (id.length > 20 || password.length > 20) {
//         setError('아이디와 비밀번호는 20자 이하여야 합니다.');
//     } else if (password !== confirmPassword) {
//         setError('비밀번호가 일치하지 않습니다.');
//     } else {
//         setError('');
//     }
//   };

//   useEffect(() => {
//     if(password == confirmPassword && (password.length > 7 && confirmPassword > 7)){
//       setStatus(true);
//     }
//     else{
//       setStatus(false);
//     }
//   },[password,confirmPassword]);


//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <View style={styles.container}>
//       <Text style={styles.title}>회원가입</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="이메일"
//         value={email}
//         returnKeyType="send"
//         autoCorrect={false}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="아이디"
//         value={id}
//         returnKeyType="send"
//         autoCorrect={false}
//         onChangeText={(text) => setID(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="비밀번호"
//         secureTextEntry={true}
//         value={password}
//         returnKeyType="send"
//         autoCorrect={false}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="비밀번호 확인"
//         secureTextEntry={true}
//         value={confirmPassword}
//         returnKeyType="send"
//         autoCorrect={false}
//         onChangeText={(text) => setConfirmPassword(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="이름"
//         secureTextEntry
//         value={name}
//         returnKeyType="send"
//         autoCorrect={false}
//         onChangeText={(text) => setConfirmPassword(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="생일"
//         secureTextEntry
//         value={birth}
//         returnKeyType="send"
//         autoCorrect={false}
//         onChangeText={(text) => setConfirmPassword(text)}
//       />
      
//       {password != confirmPassword ? <Text>비밀번호가 일치하지 않습니다.</Text> : null}
//       {status == true ? <Button title="가입하기" onPress={handleSignup} style={styles.signupEnableButton}/> : 
//       <Button title="가입하기" disabled = {true} style={styles.signupDisableButton}/>}
//       <Text style={{ color: 'red' }}>{error}</Text>
//       {/* <TouchableOpacity onPress={handleSignup} text="Sign up" /> */}
//     </View>
//   </TouchableWithoutFeedback>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,  
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   signupEnableButton: {
//     //버튼이 활성화되었을 경우 디자인
//     width:'100',
//     height:'100',
//     border: '1px solid black',
//   },
//   signupDisableButton: {
//     //버튼이 비활성화되었을 경우 디자인
//     width:'100',
//     height:'100',
//     border: '1px solid black',

//   }
// });

// export default JoinMembership;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// export default function JoinMembership({ navigation }) {
//   // 사용자 입력값을 상태로 관리
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [name, setName] = useState('');

//   // 회원가입 버튼을 눌렀을 때의 처리
//   const handleSignup = () => {
//     // 입력값이 비어있는지 확인
//     if (!email || !username || !password || !confirmPassword || !birthday || !name) {
//       alert('모든 값을 입력해주세요.');
//       return;
//     }

//     // 여기서 파이어베이스 또는 API를 이용하여 회원가입 처리를 할 수 있습니다.
//     // 이후 세 번째 창으로 네비게이션을 이용해 이동할 수 있습니다.

//     // navigation.navigate('ThirdScreen'); // 예시로 적어둔 세 번째 창으로 이동
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>당신의 정보를 입력해주세요</Text>

//       {/* 이메일 입력란 */}
//       <TextInput
//         style={styles.input}
//         placeholder="이메일 주소"
//         keyboardType="email-address"
//         autoCorrect={false}
//         returnKeyType="send"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />

//       {/* 아이디 입력란 */}
//       <TextInput
//         style={styles.input}
//         placeholder="아이디"
//         autoCorrect={false}
//         returnKeyType="send"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//       />

//       {/* 비밀번호 입력란 */}
//       <TextInput
//         style={styles.input}
//         placeholder="비밀번호"
//         secureTextEntry={true}
//         autoCorrect={false}
//         returnKeyType="send"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />

//       {/* 비밀번호 확인 입력란 */}
//       <TextInput
//         style={styles.input}
//         placeholder="비밀번호 확인"
//         secureTextEntry={true}
//         autoCorrect={false}
//         returnKeyType="send"
//         value={confirmPassword}
//         onChangeText={(text) => setConfirmPassword(text)}
//       />

//       {/* 생일 입력란 */}
//       <TextInput
//         style={styles.input}
//         placeholder="생일"
//         autoCorrect={false}
//         returnKeyType="send"
//         value={birthday}
//         onChangeText={(text) => setBirthday(text)}
//       />

//       {/* 이름 입력란 */}
//       <TextInput
//         style={styles.input}
//         placeholder="이름"
//         autoCorrect={false}
//         returnKeyType="send"
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />

//       {/* 회원가입 버튼 */}
//       <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
//         <Text style={styles.signupText}>회원가입</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 15,
//     padding: 10,
//   },
//   signupButton: {
//     backgroundColor: '#3498db',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   signupText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });
// // export default JoinMembership  



// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const RegisterScreen = () => {
//   const [userid, setUserid] = useState('');
//   const [pw1, setPw1] = useState('');
//   const [pw2, setPw2] = useState('');
//   const [name, setName] = useState('');
//   const [sex, setSex] = useState('male');
//   const [tel, setTel] = useState('');
//   const [email, setEmail] = useState('');

//   const handleRegister = () => {
//     // 회원가입 로직을 구현하세요
//     // 예: API 호출 또는 다른 필요한 작업 수행
//     console.log('회원가입 정보:', { userid, pw1, pw2, name, sex, tel, email });
//   };

//   return (
//     <View style={styles.mainCon}>
//       <View style={styles.registerBox}>
//         <Text style={styles.registerTitle}>회원가입</Text>
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="아이디"
//             value={userid}
//             onChangeText={setUserid}
//             required
//           />
//           <View style={styles.buttonContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="비밀번호"
//               value={pw1}
//               onChangeText={setPw1}
//               secureTextEntry
//               required
//             />
//           </View>
//           <TextInput
//             style={styles.input}
//             placeholder="비밀번호 확인"
//             value={pw2}
//             onChangeText={setPw2}
//             secureTextEntry
//             required
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="이름"
//             value={name}
//             onChangeText={setName}
//             required
//           />
//           <View style={styles.checkboxContainer}>
//             <Text style={styles.checkboxLabel}>성별</Text>
//             <TouchableOpacity
//               style={[styles.checkbox, sex === 'male' && styles.checked]}
//               onPress={() => setSex('male')}
//             >
//               <Text>남</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.checkbox, sex === 'female' && styles.checked]}
//               onPress={() => setSex('female')}
//             >
//               <Text>여</Text>
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             style={styles.input}
//             placeholder="전화번호"
//             value={tel}
//             onChangeText={setTel}
//             keyboardType="phone-pad"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="이메일"
//             value={email}
//             onChangeText={setEmail}
//             required
//           />
//         </View>
//         <View style={styles.registerSubmit}>
//           <TouchableOpacity style={styles.button} onPress={handleRegister}>
//             <Text style={styles.buttonText}>가입</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => alert('취소 버튼 클릭')}>
//             <Text style={styles.buttonText}>취소</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainCon: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   registerBox: {
//     width: '80%',
//   },
//   registerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   formContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   checkboxLabel: {
//     marginRight: 10,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//   },
//   checked: {
//     backgroundColor: 'lightblue',
//   },
//   registerSubmit: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//     width: '48%',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default RegisterScreen;