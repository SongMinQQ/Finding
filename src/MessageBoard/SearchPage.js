import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Image } from "react-native-expo-image-cache";

import { fireStoreDB } from '../../FireBase/DB';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

import { useSelector } from 'react-redux';

import styled from 'styled-components';


const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const BORDER_COLOR = '#F8F8F8';
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;

const BoardSelectButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  background-color: ${props => props.boardKind};
  align-items: center;
  justify-content: center;
  border-radius:  ${WINDOW_HEIGHT * 0.03}px;
`;


const SearchPage = ({ navigation: { navigate }, route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
  const [posts, setPosts] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('findBoard');
  const searchText = useSelector((state) => state.searchText);



  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          placeholder="검색"
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          placeholderTextColor={"#DADADA"}
        />
      ),
    });
  }, [navigation]);



  const fetchDocs = async () => {
    try {
      if (selectedBoard === 'findBoard') {
        const q = query(collection(fireStoreDB, selectedBoard),
          where('title', '==', searchQuery),
          where("isDeleted", "==", false),
          where("isPaied", "==", false),
          orderBy("date", "desc")
        );

        // 생성된 쿼리를 사용하여 문서들을 가져옵니다.
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("검색 결과 가져옴");
        setPosts(fetchedPosts);
      } else {
        const q = query(collection(fireStoreDB, selectedBoard),
          where('title', '==', searchQuery),
          where("isDeleted", "==", false),
          orderBy("date", "desc")
        );

        // 생성된 쿼리를 사용하여 문서들을 가져옵니다.
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("검색 결과 가져옴");
        setPosts(fetchedPosts);
      }

    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      console.log("검색: " + searchQuery);
      fetchDocs();
    } else {
      console.log("검색실패: " + searchQuery);
      setPosts([]);  // 검색어가 없을 때 결과 초기화
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("FindBoardDetail", {
        id: item.id,
        imgURL: item.imageUrl ? { uri: item.imageUrl } : { uri: 'https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a' },
        itemName: item.title,
        location: item.findLocation,
        date: item.date.toDate().toLocaleDateString('ko-KR'),
        money: item.thankMoney,
        tradeType: item.tradeType,
        tradeLocation: item.tradeLocation,
        articleExplain: item.description,
        displayName: item.displayName,
        profileImage: item.profileImage,
        sellUser: item.uid,
      })}>
      <Image
        {...{ preview, uri: item.imageUrl ? item.imageUrl : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a" }}
        style={styles.itemImage}
        onError={(e) => console.log(e)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemText} numberOfLines={1}>{item.findLocation}</Text>
        <Text style={styles.itemText}>{item.date.toDate().toLocaleDateString('ko-KR')}</Text>
        <TouchableOpacity style={styles.itemUser} 
          onPress={() => navigation.navigate("OpponentProfileTopTabNavigation", {
            opponentUserID: item.uid,
            profileImage: item.profileImage,
            displayName: item.displayName,
        })}>
          <Text>{item.displayName}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.boardSelectContainer}>
        <BoardSelectButton boardKind={selectedBoard == "findBoard" ? "#DADADA" : "#fff"}
          onPress={() => {
            setSelectedBoard('findBoard')
            console.log(searchText)
          }}>
          <Text style={styles.boardSelectText}>습득 물건</Text>
        </BoardSelectButton>
        <BoardSelectButton boardKind={selectedBoard == "findBoard" ? "#fff" : "#DADADA"}
          onPress={() => {
            setSelectedBoard('lostBoard')
            console.log(searchText)
          }}>
          <Text style={styles.boardSelectText}>분실 물건</Text>
        </BoardSelectButton>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  boardSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: WINDOW_HEIGHT * 0.06,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 10,
  },
  boardSelectButton: {
    flex: 1,
    height: '100%',
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: WINDOW_HEIGHT * 0.03,
  },
  boardSelectText: {
    color: '#000',
    fontWeight: 'bold',
  },
  item: {
    width: '100%',
    height: ITEM_SIZE,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    padding: 10,
  },
  itemImage: {
    width: ITEM_SIZE * 0.8,
    height: ITEM_SIZE * 0.8,
    borderRadius: ITEM_BORDER_RADIUS,
  },
  itemName: {
    width: '100%',
    fontSize: FONT_SIZE_TITLE,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  itemText: {
    width: '100%',
    fontSize: FONT_SIZE_TEXT,
    textAlign: 'left',
  },
  itemUser: {
    alignSelf: 'flex-end',
  },
  textContainer: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    width: WINDOW_WIDTH * 0.9,
    height: 40,
    fontSize: WINDOW_HEIGHT * 0.025,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // 추가 스타일
  }
});

export default SearchPage;