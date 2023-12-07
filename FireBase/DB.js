import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { keys } from "../key/keyCollection";

const firebaseConfig = {
  // apiKey: keys.firebaseKey,
  apiKey: 'AIzaSyC2c4TvcuJi6e5kGFHYf-3CVhHqgN8EyWM',
  authDomain: "finding-e15ab.firebaseapp.com",
  projectId: "finding-e15ab",
  storageBucket: "finding-e15ab.appspot.com",
  messagingSenderId: "1072795597185",
  appId: "1:1072795597185:web:c7b92f3ce404cf16b91080",
  measurementId: "G-DX7MTGPNDG"
};

// 파이어베이스 앱 초기화
export const app = initializeApp(firebaseConfig);

// AsyncStorage를 사용한 Firebase 인증 초기화
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Firestore 및 Storage 인스턴스 초기화
export const fireStoreDB = getFirestore(app);
export const storage = getStorage(app);
