import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const FindIdPhoneNumber = ({ navigation }) => {

  const [userPhonNumber, setUserPhonNumber] = useState('');
  const _handleUserPhonNumberChange = text => {
    setUserPhonNumber(text);
  }
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', // 이거 바꾸면 됨
    },
  };
  return (
    
      <View style={styles.flexbox}>
        <TextInput style={styles.inputView}
          mode="outlined"
          placeholder='핸드폰번호'
          onChangeText={_handleUserPhonNumberChange}
          keyboardType={'phone-pad'}
          theme={theme}
        />

          <TouchableOpacity style={styles.correctBtn}
            onPress={() => {
              navigation.navigate("Home")
              console.log(`userPhonNumber: ${userPhonNumber}`);
            }}
          ><Text style={{ fontWeight: 'bold', color: 'white' }}>인증번호 받기</Text>
          </TouchableOpacity>

      </View>
  );
};


export default FindIdPhoneNumber;

const styles = StyleSheet.create({

  flexbox: {
    flex: 1,
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: WINDOW_HEIGHT * 0.04,
  },

  inputView: {
    backgroundColor: "#fff",
    width: "90%",
  },
  correctBtn: {
    width: "90%",
    borderRadius: 25,
    height: WINDOW_HEIGHT * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: WINDOW_HEIGHT * 0.02,
    backgroundColor: "#007bff",
  },

});
