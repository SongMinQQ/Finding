import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import PaymentMain from './PaymentMain';
import LegalCheckBox from './LegalCheckBox';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const WINDOW_HEIGHT = Dimensions.get('window').height;

const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03;

const PaymentLegalAgree = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();


    //현재 로그인한 사용자의 UID
    const uid = useSelector((state) => state.UID);
    //현재 로그인한 사용자의 닉네임
    const displayName = useSelector((state) => state.displayName);

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const allChecked = isChecked1 && isChecked2 && isChecked3;
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    {displayName} 님의 물건이{'\n'}
                    <Text style={styles.highlightText}>정말 맞나요?</Text>
                </Text>
                <PaymentMain
                    imgURL={route.params.imgURL}
                    itemName={route.params.itemName}
                    location={route.params.location}
                    date={route.params.date}
                />

                <View style={styles.legalSectionContainer}>
                    <ScrollView style={styles.legalSection}>
                        <Text style={styles.legalHeader}>사기와 공갈의 죄</Text>
                        <Text style={styles.legalTitle}>347조(사기)</Text>
                        <Text style={styles.legalContent}>①사람을 기망하여 재물의 교부를 받거나 재산상의 이익을 취득한 자는 10년 이하의 징역 또는 2천만원 이하의 벌금에 처한다. {`\n<개정 1995. 12. 29.>`}</Text>
                        <Text style={styles.legalContent}>②전항의 방법으로 제삼자로 하여금 재물의 교부를 받게 하거나 재산상의 이익을 취득하게 한 때에도 전항의 형과 같다.</Text>
                    </ScrollView>
                </View>

                <LegalCheckBox 
                    label="정말 제 물건이 맞습니다."
                    value={isChecked1}
                    onChange={setChecked1}
                />
                <LegalCheckBox
                    label="법률 안내사항을 모두 숙지하였습니다."
                    value={isChecked2}
                    onChange={setChecked2}
                />
                <LegalCheckBox
                    label="법률을 어겼을 시 처벌을 받을 수 있다는 것을 인지하였습니다."
                    value={isChecked3}
                    onChange={setChecked3}
                />
                <TouchableOpacity
                    style={[styles.findButton, { backgroundColor: allChecked ? '#007bff' : '#cccccc' }]}
                    disabled={!allChecked}
                    onPress={() => {
                        navigation.navigate("PaymentCheck", {
                            id: route.params.id,
                            imgURL: route.params.imgURL,
                            itemName: route.params.itemName,
                            location: route.params.location,
                            date: route.params.date,
                            tradeType: route.params.tradeType,
                            tradeLocation: route.params.tradeLocation,
                            displayName: route.params.displayName, // 판매자 이름
                            money: route.params.money,
                            sellUser: route.params.sellUser, // 판매자 Uid
                        })
                    }}
                >
                    <Text style={styles.findButtonText}>물건 찾기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    headerText: {
        fontSize: FONT_SIZE_HEADER,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 15,
    },
    highlightText: {
        color: '#FF3B3B',
    },
    legalSectionContainer: {
        width: '100%',
        height: WINDOW_HEIGHT * 0.27, // 고정 높이를 설정
        paddingHorizontal: 15,
        marginBottom: 10, // 필요에 따라 추가
    },
    legalSection: {
        flex: 1, // legalSectionContainer 내에서 가능한 모든 공간을 차지하도록 설정
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    legalHeader: {
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.022,
        marginBottom: 15,
    },
    legalTitle: {
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.017,
        marginBottom: 10,
    },
    legalContent: {
        fontSize: WINDOW_HEIGHT * 0.015,
        marginBottom: 5,
    },
    findButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        width: WINDOW_HEIGHT * 0.14,
        height: WINDOW_HEIGHT * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: WINDOW_HEIGHT * 0.01,
    },
    findButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.022,
    },
});

export default PaymentLegalAgree
