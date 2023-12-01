import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const EditProfileButton = ({ type }) => {
    const navigation = useNavigation();

    const editPost = () => {
        if (type === 'find') {
            navigation.navigate("WritePostFindScreen");
        } else if (type === 'lost') {
            navigation.navigate("WritePostLostScreen");
        }
    };

    return (
        <TouchableOpacity onPress={editPost}>
            <FontAwesome name="edit" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
    );
};

export default EditProfileButton;
