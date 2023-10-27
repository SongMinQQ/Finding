import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import GladMessageDialog from './GladMessageDialog';

const WINDOW_WIDTH = Dimensions.get('window').width;

const CARD_WIDTH = WINDOW_WIDTH * 0.9;
const PROFILE_IMAGE_SIZE = CARD_WIDTH * 0.2;
const CARD_BORDER_RADIUS = 10;
const TEXT_SIZE_MEDIUM = CARD_WIDTH * 0.04;
const TEXT_SIZE_SMALL = CARD_WIDTH * 0.03;


const ProfileGladMessage = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);


    const messagesData = [...Array(10)].map((_, index) => ({
        id: index,
        userName: `사용자 ${index + 1}`,
        lostArticle: `물건 ${index + 1}`,
        profileImage: require('../../img/defaultProfile.png'),
        message: `물건 ${index + 1}을 찾아주셔서 정말 감사합니다. 덕분에 잃어버린 물건을 찾을 수 있었습니다. 이 은혜 평생 잊지 않겠습니다. 정말 너무나도 고맙습니다.`
           
    }));


    const handleCardPress = (index) => {
        setSelectedMessage(index);
        setDialogVisible(true);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {messagesData.map((message) => (
                    <TouchableOpacity key={message.id} onPress={() => handleCardPress(message)}>
                        <View style={styles.card}>
                            <Image
                                source={ message.profileImage }
                                style={styles.profileImage}
                            />
                                <View style={styles.messageContainer}>
                                    <Text style={styles.itemName}>{message.userName}</Text>
                                    <Text
                                        style={styles.messageText}
                                        numberOfLines={2}
                                        ellipsizeMode='tail'
                                    >
                                        {message.message}
                                    </Text>
                                </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedMessage && (
                <GladMessageDialog
                    visible={dialogVisible}
                    onClose={() => setDialogVisible(false)}
                    message={selectedMessage.message}
                    userName={selectedMessage.userName}
                    lostArticle={selectedMessage.lostArticle}
                    profileImage={selectedMessage.profileImage}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    card: {
        width: CARD_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 15,
        borderRadius: CARD_BORDER_RADIUS,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        marginRight: 15,
    },
    messageContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: TEXT_SIZE_MEDIUM,
        fontWeight: 'bold',
    },
    messageText: {
        fontSize: TEXT_SIZE_SMALL,
        marginTop: 5,
    }
});

export default ProfileGladMessage;
