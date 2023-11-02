import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const WritePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    //사용자가 입력한 텍스트
    const [description, setDescription] = useState('');
    //사용자가 선택한 이미지
    const [selectedImage, setSelectedImage] = useState(null);
    //image  address
    const [imageUrl, setImageUrl] = useState('');
    //권한 요청
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  
    // const handleImagePicker = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync();
    //     if (!result.cancelled) {
    //         setSelectedImage(result.uri);
    //     }
    // };

    const uploadImage = async () => {
        // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (!status?.granted) {
          const permission = await requestPermission();
          if (!permission.granted) {
            return null;
          }
        }
        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
          aspect: [1, 1]
        });
        if (result.cancelled) {
          return null; // 이미지 업로드 취소한 경우
        }
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        console.log(result);
        setImageUrl(result.assets[0].uri);
      };

    const handleSubmit = () => {
        // 글을 서버에 제출하거나 필요한 동작을 수행할 수 있음
        // 이 부분에서 글을 저장하거나 API 호출을 할 수 있습니다.
        // 예를 들면, 글을 서버로 보내고 성공적으로 저장되면 다른 화면으로 이동할 수 있습니다.
        navigation.navigate('YourSuccessScreen'); // YourSuccessScreen은 저장이 완료된 화면 이름
    };

    // useEffect(() => {
    //     console.log(imageUrl);
    // },[imageUrl]);
    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.label}>제목</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="제목"
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                    <Text style={styles.label}>찾은 곳</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="찾은 곳"
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                    <Text style={styles.label}>자세한 설명</Text>
                    <TextInput
                        style={[styles.input, { height: 150 }]}
                        multiline
                        numberOfLines={4}
                        placeholder="자세한 설명"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                    <Button 
                    title="이미지 선택" onPress={uploadImage} />
                    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.selectedImage} />}
                    <Button
                        title="글 작성 완료" onPress={handleSubmit}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15
    },
    input: {
        width: '100%', // 넓이를 100%로 설정
        height: 40,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginBottom: 30,
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
});

export default WritePostScreen;
