import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Image } from '@rneui/themed';
import { useSelector } from "react-redux";


const WINDOW_HEIGHT = Dimensions.get("window").height;


const ITEM_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.2;
const ITEM_IMAGE_SIZE = ITEM_LAYOUT_HEIGHT * 0.8;
const BORDER_RADIUS = WINDOW_HEIGHT * 0.01;
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.03;
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.017;
const BUTTON_PADDING = WINDOW_HEIGHT * 0.01;
const BUTTON_BORDER_RADIUS = WINDOW_HEIGHT * 0.006;

// DetailMain 컴포넌트
const DetailMain = ({ imgURL, itemName, location, date, onPress, findOrLost, writerId }) => {
  const uid = useSelector((state) => state.UID);
  

  return (
    <View style={styles.itemLayout}>
      {/* <Image
        {...preview}
        uri={imgURL ? imgURL.uri : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a"}
        style={styles.itemImage}
        onError={(e) => {
          console.log(e.nativeEvent.error);
          console.log(imgURL);
        }}
      /> */}
      <Image
        source={{ uri: imgURL ? imgURL.uri : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a" }}
        containerStyle={styles.itemImage}
        PlaceholderContent={<ActivityIndicator style={styles.itemImage}/>}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemDetail}>
          {findOrLost === "find" ? "획득지역: " : "분실지역: "}
          {location}
        </Text>
        <Text style={styles.itemDetail}>
          {findOrLost === "find" ? "획득날짜: " : "분실날짜: "}
          {date}
        </Text>
        {(() => {
          if (findOrLost === "find") return (
            <TouchableOpacity style={styles.findButton} onPress={onPress}>
              <Text style={styles.findButtonText}>{writerId != uid ? "물건 찾기" : "글 삭제"}</Text>
            </TouchableOpacity>)
          else if (findOrLost === "lost" && writerId === uid) return (
            <TouchableOpacity style={styles.findButton} onPress={onPress}>
              <Text style={styles.findButtonText}>글삭제</Text>
            </TouchableOpacity>)
          else return (
            <View style={[styles.findButton, { backgroundColor: '#fff' }]}>
              <Text style={styles.findButtonText}>글 삭제</Text>
            </View>)
        })()}
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  itemLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
    overflow: "hidden",
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
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: "bold",
  },
  itemDetail: {
    fontSize: FONT_SIZE_SMALL,
  },
  findButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: BUTTON_PADDING,
    backgroundColor: "#007bff",
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  findButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: FONT_SIZE_SMALL,
  },
});

export default DetailMain;
