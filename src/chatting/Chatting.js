import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const Chatting = () => {
    return (
        <View style={styles.main}>
            <View style={styles.textArea}>
                <FlatList inverted={true}>

                </FlatList>
                <TextInput style={styles.input}/>
                <TouchableOpacity>
                    <MaterialIcons name="add-a-photo" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="send" size={24} color="black" style={styles.sendButton}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor:"#ffffff",
        justifyContent: "flex-end",
        // alignItems: 'center',
        padding: 16,
    },
    input: {
        flex: 1,
        // borderTop: 1,
        // borderTopColor: 'black',
        paddingHorizontal: 16,
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
        paddingVertical: 5,
    },
    sendButton: {
        paddingHorizontal: 16,
    },
})
export default Chatting;