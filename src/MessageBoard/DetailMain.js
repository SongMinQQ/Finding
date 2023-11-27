import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

// 창의 높이를 계산합니다.
const WINDOW_HEIGHT = Dimensions.get('window').height;

// 반응형 레이아웃을 위한 상대적 단위
const ITEM_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.2;
const ITEM_IMAGE_SIZE = ITEM_LAYOUT_HEIGHT * 0.8;
const BORDER_RADIUS = WINDOW_HEIGHT * 0.01; // 예: 전체 높이의 0.5%
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.03; // 예: 전체 높이의 2%
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.017; // 예: 전체 높이의 1.5%
const BUTTON_PADDING = WINDOW_HEIGHT * 0.01; // 예: 전체 높이의 1%
const BUTTON_BORDER_RADIUS = WINDOW_HEIGHT * 0.006; // 예: 전체 높이의 0.5%

// DetailMain 컴포넌트
const DetailMain = ({ imgURL, itemName, location, date, onPress, findOrLost }) => {
  return (
    <View style={styles.itemLayout}>
      <Image source={ imgURL } style={styles.itemImage} />
      <View style={[styles.itemContent, findOrLost === 'find' ? {justifyContent: 'space-between'}:{justifyContent: 'flex-start',gap:10}]}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemDetail}>{findOrLost === 'find' ? '획득지역: ' : '분실지역: '}{location}</Text>
        <Text style={styles.itemDetail}>{findOrLost === 'find' ? '획득날짜: ' : '분실날짜: '}{date}</Text>
        {findOrLost === 'find' && (
          <TouchableOpacity style={styles.findButton} onPress={onPress}>
            <Text style={styles.findButtonText}>물건 찾기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  itemLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 15,
  },
  itemImage: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: BORDER_RADIUS,
  },
  itemContent: {
    flex: 1,
    paddingHorizontal: 10,
    height: ITEM_IMAGE_SIZE,
    //justifyContent: 'space-between',

  },
  itemName: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  itemDetail: {
    fontSize: FONT_SIZE_SMALL,
  },
  findButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    padding: BUTTON_PADDING,
    backgroundColor: '#007bff',
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  findButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT_SIZE_SMALL,
  },
});

export default DetailMain;
