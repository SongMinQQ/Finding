import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMain from './DetailMain';


const FindBoardDetail = () => {
    const navigation = useNavigation();

    const handleFindPress = () => {
        navigation.navigate("PaymentLegalAgree");
      };

    return (
        <View style={styles.container}>
            <DetailMain
                imgURL="https://picsum.photos/id/5/200/200"
                itemName="노트북"
                category="전자기기"
                location="충남 천안시"
                date="2023-10-10"
                onDetail = "true"
                onPress={handleFindPress}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
   
});



export default FindBoardDetail;