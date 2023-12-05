import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Modal, Button, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Image } from '@rneui/themed';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const DIALOG_WIDTH = WINDOW_WIDTH * 0.8;
const DIALOG_HEIGHT = WINDOW_HEIGHT * 0.6;

const PROFILE_IMAGE_SIZE = DIALOG_HEIGHT * 0.15;
const TEXT_SIZE_LARGE = DIALOG_HEIGHT * 0.042;
const TEXT_SIZE_MEDIUM = DIALOG_HEIGHT * 0.032;

const GladMessageDialog = ({ visible, onClose, message, userName, lostArticle, profileImage }) => {
    

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.dialog}>
                    <View style={styles.dialogHeader}>
                        <View style={styles.dialogProfileContainer}>
                            {/* <Image
                                {...preview}
                                uri={profileImage ? profileImage.uri : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6"}
                                style={styles.dialogProfileImage}
                                onError={(e) => {
                                    console.log(e.nativeEvent.error);
                                    console.log(imgURL);
                                }}
                            /> */}
                            <Image
                                source={{ uri: profileImage ? profileImage.uri : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6" }}
                                containerStyle={styles.dialogProfileImage}
                                PlaceholderContent={<ActivityIndicator style={styles.dialogProfileImage}/>}
                            />
                            <Text style={styles.dialogUsername}>{userName}</Text>
                        </View>
                        <Ionicons name="close" size={TEXT_SIZE_LARGE} onPress={() => onClose()} color={'#000000'} />
                    </View>
                    <View style={styles.dialogContent}>
                        <ScrollView>
                            <Text style={styles.dialogItemName}>{lostArticle}</Text>
                            <Text style={styles.dialogMessageText}>{message}</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dialog: {
        width: DIALOG_WIDTH,
        height: DIALOG_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dialogHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    dialogContent: {
        flex: 6,
    },
    dialogProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dialogProfileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        marginRight: 10,
    },
    dialogUsername: {
        fontSize: TEXT_SIZE_LARGE,
        fontWeight: 'bold',
    },
    dialogItemName: {
        fontSize: TEXT_SIZE_LARGE,
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    dialogMessageText: {
        fontSize: TEXT_SIZE_MEDIUM,
        alignSelf: 'flex-start',
    }
});

export default GladMessageDialog;
