import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const EditPostButton = (props) => {
    const navigation = useNavigation();

    const edit = true;

    const {
        type,
        id,
        imgURL,
        itemName,
        location,
        date,
        money,
        tradeType,
        tradeLocation,
        articleExplain,
        displayName,
        profileImage,
        sellUser,
    } = props;

    const editPost = () => {
        if (type === 'find') {
            navigation.navigate("WritePostFindScreen", {
                id: id,
                imgURL: imgURL,
                itemName: itemName,
                location: location,
                date: date,
                money: money,
                tradeType: tradeType,
                tradeLocation: tradeLocation,
                articleExplain: articleExplain,
                displayName: displayName,
                profileImage: profileImage,
                sellUser: sellUser,
                edit: edit,
            });
        } else if (type === 'lost') {
            navigation.navigate("WritePostLostScreen", {
                id: id,
                imgURL: imgURL,
                itemName: itemName,
                location: location,
                date: date,
                money: money,
                tradeType: tradeType,
                tradeLocation: tradeLocation,
                articleExplain: articleExplain,
                displayName: displayName,
                profileImage: profileImage,
                sellUser: sellUser,
                edit: edit,
            });
        }
    };

    return (
        <TouchableOpacity onPress={editPost}>
            <FontAwesome name="edit" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
    );
};

export default EditPostButton;
