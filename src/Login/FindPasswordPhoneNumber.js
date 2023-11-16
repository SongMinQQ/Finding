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
