import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const WINDOW_HEIGHT = Dimensions.get('window').height;

// 제목 단위 폰트 사이즈
const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03;
// 작은 폰트 사이즈
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.015;
// 중간 폰트 사이즈
const FONT_SIZE_MEDIUM = WINDOW_HEIGHT * 0.02;
// 큰 폰트 사이즈
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.025;
// 버튼 둥근 모서리 값
const BUTTON_BORDER_RADIUS = WINDOW_HEIGHT * 0.006;
// 버튼 padding 값
const BUTTON_PADDING = WINDOW_HEIGHT * 0.01;

const PaymentInfo = ({ userName, userPhoneNum, userAdress, thankCost, deliveryCost }) => {
    const formattedThankCost = parseInt(thankCost).toLocaleString();
    const formattedDeliveryCost = parseInt(deliveryCost).toLocaleString();
    const totalCost = parseInt(thankCost) + parseInt(deliveryCost);
    const formattedTotalCost = totalCost.toLocaleString();
    return (
        <View>
            <View style={styles.deliverySection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.sectionTitle}>배송 정보 입력</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>정보 수정</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>받는 분</Text>
                        <Text style={styles.value}>{userName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>연락처</Text>
                        <Text style={styles.value}>{userPhoneNum}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>주소</Text>
                        <Text style={styles.value}>{userAdress}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.requestInput}>
                    <Text style={styles.requestPlaceholder}>배송시 요청사항 선택</Text>
                    <Icon name="chevron-down" size={FONT_SIZE_MEDIUM} color="#9B9B9B" />
                </TouchableOpacity>
            </View>

            <View style={styles.paymentSection}>
                <Text style={styles.sectionTitle}>결제 금액 확인</Text>
                <View style={styles.paymentContent}>
                    <Text style={styles.paymentInfo}>사례비 금액</Text>
                    <Text style={[styles.paymentInfo, { color: '#000000' }]}>{formattedThankCost}원</Text>
                </View>
                <View style={styles.paymentContent}>
                    <Text style={styles.paymentInfo}>배송비</Text>
                    <Text style={[styles.paymentInfo, { color: '#000000' }]}>{formattedDeliveryCost}원</Text>
                </View>
                <View style={[styles.paymentContent, { marginTop: 20 }]}>
                    <Text style={styles.TotalInfo}>총 금액</Text>
                    <Text style={styles.TotalInfo}>{formattedTotalCost}원</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deliverySection: {
        marginTop: 10,
        borderTopWidth: 10,
        borderTopColor: '#F8F8F8',
        padding: 15,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    editButton: {
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: BUTTON_PADDING,
        borderRadius: BUTTON_BORDER_RADIUS,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_SMALL,
    },
    infoContainer: {
        paddingBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // 각 줄 사이의 간격
    },
    label: {
        fontSize: FONT_SIZE_MEDIUM,
        color: '#000',
        fontWeight: 'bold',
        width: WINDOW_HEIGHT * 0.1, // 라벨의 너비를 고정하여 값들의 시작점을 일치시킵니다.
    },
    value: {
        fontSize: FONT_SIZE_MEDIUM,
        color: '#000',
        flex: 1, // 값이 라벨 너비를 초과할 수 있도록 합니다.
    },
    requestInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#9B9B9B',
        borderRadius: WINDOW_HEIGHT * 0.005, 
        padding: WINDOW_HEIGHT * 0.01, 
        height: WINDOW_HEIGHT * 0.06,
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    requestPlaceholder: {
        fontSize: FONT_SIZE_MEDIUM,
        color: '#9B9B9B',
    },

    paymentSection: {
        marginTop: 10,
        borderTopWidth: 10,
        borderTopColor: '#F8F8F8',
        padding: 15,
    },
    paymentContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    paymentInfo: {
        color: '#9B9B9B',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_MEDIUM,
    },
    TotalInfo: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: FONT_SIZE_LARGE,
    },
});
export default PaymentInfo
