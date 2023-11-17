import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import styled from 'styled-components';
import FindIdEmail from './FindIdEmail';
import FindIdPhoneNumber from './FindIdPhoneNumber';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const FindIdBox = styled.TouchableOpacity`
  flex: 1;
  align-itmes: center;
  justify-content: center;
  background-color: ${props => props.findID};
  border-color: #EEEEEE;
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: ${props => props.isFirst ? '0px' : '1px'};
`;
const RowSelectText = styled.Text`
  text-align: center;
  color: ${props => props.findID};
  font-weight: bold;
`;
const FindId = ({ navigation }) => {
  // TextInput 클릭 시 테두리 색 변경하는 코드
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', // 이거 바꾸면 됨
    },
  }

  const [findID, setFindID] = useState('Email');

  return (
      <View style={styles.flexbox}>
        <View style={styles.rowSelectBox}>
          <FindIdBox findID={findID === "Email" ? "#fff" : "#EEEEEE"} isFirst={true}
            onPress={() => {
              //navigation.navigate("Find Id Email")
              setFindID('Email');
              }}>
            <RowSelectText findID={findID === "Email" ? "#000" : "#DADADA"}>이메일로 찾기</RowSelectText>
          </FindIdBox>
          <FindIdBox findID={findID === "Email" ? "#EEEEEE" : "#fff"}
            onPress={() => {
              //navigation.navigate("Find Id PhoneNumber")
              setFindID('PhoneNum');
              }}>
            <RowSelectText findID={findID === "Email" ? "#DADADA" : "#000"}>핸드폰으로 찾기</RowSelectText>
          </FindIdBox>
        </View>
        {findID === 'Email' ? <FindIdEmail navigation={navigation} /> : <FindIdPhoneNumber navigation={navigation} />}

      </View>

  );
};

export default FindId;

const styles = StyleSheet.create({

  flexbox: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: WINDOW_HEIGHT * 0.04,
  },
  rowSelectBox: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '90%',
    height: WINDOW_HEIGHT * 0.07,
  },



});