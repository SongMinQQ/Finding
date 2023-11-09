import React from 'react';
import { View, Text, TextInput, Button , StyleSheet} from 'react-native';

const FindPasswordPhoneNumber = ({navigation}) => {
    <View>
    <Text style = {styles.title}>비밀번호 번호로 찾기 페이지</Text>
    <TextInput style = {styles.inputView}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })} />
    <TextInput style = {styles.inputView}
    placeholder="Enter your PhoneNumber"
    value={this.state.phonenumber}
    onChangeText={(text) => this.setState({ phonenumber: text })}
    />
<TouchableOpacity style={styles.correctBtn} onPress={() => navigation.navigate("Home")}><Text>확인</Text></TouchableOpacity>
    </View> 
}



export default FindPasswordPhoneNumber;


const styles = StyleSheet.create({

    inputView: {
        backgroundColor: "#EFFBEF",
        textShadowColor: "#FBFBEF",
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
      },
correctBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#F5A9E1",
},

});
