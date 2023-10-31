import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import PaymentMain from './PaymentMain';
import LegalCheck from './LegalCheck';

const WINDOW_HEIGHT = Dimensions.get('window').height;


const PaymentLegalAgree = () => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const allChecked = isChecked1 && isChecked2 && isChecked3;
    return (
        <View style={styles.container}>
            <PaymentMain
                userName="홍길동"
                imgURL="https://picsum.photos/id/5/200/200"
                itemName="노트북"
                category="전자기기"
                location="충남 천안시"
                date="2023-10-10"
            />
            <ScrollView style={styles.legalSection}>
                <Text>법률 안내사항</Text>
            </ScrollView>

            <LegalCheck
              label="정말 제 물건이 맞습니다."
              value={isChecked1}
              onChange={setChecked1}
            />
            <LegalCheck
              label="법률 안내사항을 모두 숙지하였습니다."
              value={isChecked2}
              onChange={setChecked2}
            />
            <LegalCheck
              label="법률을 어겼을 시 처벌을 받을 수 있다는 것을 인지하였습니다."
              value={isChecked3}
              onChange={setChecked3}
            />
            <TouchableOpacity 
                style={[styles.findButton, { backgroundColor: allChecked ? '#007bff' : '#cccccc' }]}
                disabled={!allChecked} 
                onPress={()=>{console.log("ㅎㅇ")}}
            >
                <Text style={styles.findButtonText}>물건 찾기</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    legalSection: {
        width: '95%',
        height: WINDOW_HEIGHT * 0.22,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        padding: 15,
    },
    findButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        width: WINDOW_HEIGHT * 0.14,
        height: WINDOW_HEIGHT * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: WINDOW_HEIGHT * 0.01,
    },
    findButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.022, 
    },
});

export default PaymentLegalAgree
