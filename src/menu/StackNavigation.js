import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Chatting from '../components/Chatting';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 


const Stack = createStackNavigator();

const StackNavigation = () => {
    const ref = useRef(null);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Chatting} options={{
                title: 'Finding',
                headerRight: () => (
                    <View style={styles.headerRight}>
                        <FontAwesome name="search" size={24} color="black" style={styles.icons}/>
                        <FontAwesome5 name="bell" size={24} color="black" style={styles.icons}/>
                    </View>
                )
            }}/>
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