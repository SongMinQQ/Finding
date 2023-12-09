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
        <ScrollView style={{ backgroundColor: '#fff' }}>
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

                        <Text style={styles.legalTitle}>제347조(사기)</Text>
                        <Text style={styles.legalContent}>①사람을 기망하여 재물의 교부를 받거나 재산상의 이익을 취득한 자는 10년 이하의 징역 또는 2천만원 이하의 벌금에 처한다. {`\n<개정 1995. 12. 29.>`}</Text>
                        <Text style={styles.legalContent}>②전항의 방법으로 제삼자로 하여금 재물의 교부를 받게 하거나 재산상의 이익을 취득하게 한 때에도 전항의 형과 같다.</Text>
                    
                        <Text style={styles.legalTitle}>제347조의2(컴퓨터등 사용사기)</Text>
                        <Text style={styles.legalContent}>컴퓨터등 정보처리장치에 허위의 정보 또는 부정한 명령을 입력하거나 권한 없이 정보를 입력ㆍ변경하여 정보처리를 하게 함으로써 재산상의 이익을 취득하거나 제3자로 하여금 취득하게 한 자는 10년 이하의 징역 또는 2천만원 이하의 벌금에 처한다.{`\n[전문개정 2001. 12. 29.]`}</Text>
                    
                        
                        <Text style={styles.legalHeader}>횡령과 배임의 죄</Text>
                        <Text style={styles.legalTitle}>제360조(점유이탈물횡령)</Text>
                        <Text style={styles.legalContent}>①유실물, 표류물 또는 타인의 점유를 이탈한 재물을 횡령한 자는 1년 이하의 징역이나 300만원 이하의 벌금 또는 과료에 처한다. {`\n<개정 1995. 12. 29.>`}</Text>
                        <Text style={styles.legalContent}>②매장물을 횡령한 자도 전항의 형과 같다.</Text>
                    

                        <Text style={styles.legalHeader}>전자거래의 안전성 확보 및 소비자 보호 {`\n<개정 2012. 6. 1.>`}</Text>
                        <Text style={styles.legalTitle}>제12조(개인정보 보호)</Text>
                        <Text style={styles.legalContent}>① 정부는 전자거래의 안전성과 신뢰성을 확보하기 위하여 전자거래이용자의 개인정보를 보호하기 위한 시책을 수립ㆍ시행하여야 한다.</Text>
                        <Text style={styles.legalContent}>② 전자거래사업자는 전자거래이용자의 개인정보를 수집ㆍ이용 또는 제공하거나 관리할 때 정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관계 규정을 준수하여야 한다. {`\n[전문개정 2012. 6. 1.]`}</Text>


                        <Text style={styles.legalHeader}>유실물 법령</Text>

                        <Text style={styles.legalTitle}>제3조 (비용 부담)</Text>
                        <Text style={styles.legalContent}>습득물의 보관비, 공고비(公告費), 그 밖에 필요한 비용은 물건을 반환받는 자나 물건의 소유권을 취득하여 이를 인도(引渡)받는 자가 부담하되, 「민법」 제321조부터 제328조까지의 규정을 적용한다.{`\n[전문개정 2011.5.30.]`}</Text>

                        <Text style={styles.legalTitle}>제4조 (보상금)</Text>
                        <Text style={styles.legalContent}>물건을 반환받는 자는 물건가액(物件價額)의 100분의 5 이상 100분의 20 이하의 범위에서 보상금(報償金)을 습득자에게 지급하여야 한다. 다만, 국가·지방자치단체와 그 밖에 대통령령으로 정하는 공공기관은 보상금을 청구할 수 없다.{`\n[전문개정 2011.5.30.]`}</Text>

                        <Text style={styles.legalTitle}>제7조 (습득자의 권리포기)</Text>
                        <Text style={styles.legalContent}>습득자는 미리 신고하여 습득물에 관한 모든 권리를 포기하고 의무를 지지 아니할 수 있다.{`\n[전문개정 2011.5.30.]`}</Text>
                        
                        <Text style={styles.legalTitle}>제8조 (유실자의 권리 포기)</Text>
                        <Text style={styles.legalContent}>① 물건을 반환받을 자는 그 권리를 포기하고 제3조의 비용과 제4조의 보상금 지급의 의무를 지지 아니할 수 있다.</Text>

                        <Text style={styles.legalTitle}>제11조 (장물의 습득)</Text>
                        <Text style={styles.legalContent}>① 범죄자가 놓고간 것으로 인정되는 물건을 습득한 자는 신속히 그 물건을 경찰서에 제출하여야 한다.</Text>

                        <Text style={styles.legalTitle}>제12조 (준유실물)</Text>
                        <Text style={[styles.legalContent,{marginBottom: 20}]}>착오로 점유한 물건, 타인이 놓고 간 물건이나 일실(逸失)한 가축에 관하여는 이 법 및 「민법」 제253조를 준용한다. 다만, 착오로 점유한 물건에 대하여는 제3조의 비용과 제4조의 보상금을 청구할 수 없다.{`\n[전문개정 2011.5.30.]`}</Text>

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
        height: WINDOW_HEIGHT * 0.29, // 고정 높이를 설정
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
        marginVertical: 5,
    },
    legalTitle: {
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT * 0.017,
        marginVertical: 10,
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
