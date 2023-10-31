import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

// 창의 높이를 계산합니다.
const WINDOW_HEIGHT = Dimensions.get('window').height;

// 반응형 레이아웃을 위한 상대적 단위
const ITEM_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.16;
const ITEM_IMAGE_SIZE = ITEM_LAYOUT_HEIGHT * 0.8;
const BORDER_RADIUS = WINDOW_HEIGHT * 0.01; // 예: 전체 높이의 0.5%
const FONT_SIZE_HEADER = WINDOW_HEIGHT * 0.03; // 예: 전체 높이의 2.5%
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.025; // 예: 전체 높이의 1.8%
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.017; // 예: 전체 높이의 1.4%

// PaymentMain 컴포넌트
const PaymentMain = ({ userName, imgURL, itemName, category, location, date }) => {
  return (
    <View>
      <Text style={styles.headerText}>
        {userName}님의 물건이{'\n'}
        <Text style={styles.highlightText}>정말 맞나요?</Text>
      </Text>
      <View style={styles.itemLayout}>
        <Image source={{ uri: imgURL }} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{itemName}</Text>
          <Text style={styles.itemDetail}>{`카테고리: ${category}`}</Text>
          <Text style={styles.itemDetail}>{`획득지역: ${location}`}</Text>
          <Text style={styles.itemDetail}>{`획득날짜: ${date}`}</Text>
        </View>
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  headerText: {
    fontSize: FONT_SIZE_HEADER,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 15,
  },
  highlightText: {
    color: '#FF3B3B',
  },
  itemLayout: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    height: ITEM_LAYOUT_HEIGHT,
    padding: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  itemImage: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: BORDER_RADIUS,
  },
  itemContent: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },
  itemName: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  itemDetail: {
    fontSize: FONT_SIZE_SMALL,
  },
  // findButton 및 findButtonText 스타일은 위 코드에서 제거되었습니다. 필요하다면 이전 코드를 참조하여 추가할 수 있습니다.
});

export default PaymentMain;
