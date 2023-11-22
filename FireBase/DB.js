import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2c4TvcuJi6e5kGFHYf-3CVhHqgN8EyWM",
  authDomain: "finding-e15ab.firebaseapp.com",
  projectId: "finding-e15ab",
  storageBucket: "finding-e15ab.appspot.com",
  messagingSenderId: "1072795597185",
  appId: "1:1072795597185:web:c7b92f3ce404cf16b91080",
  measurementId: "G-DX7MTGPNDG"
};

// 파이어베이스 연결
export const app = initializeApp(firebaseConfig);
// 유저 데이터 연결
export const auth = getAuth(app);
// 게시글 데이터 연결
export const fireStoreDB = getFirestore(app);
// 이미지 데이터 연결
export const storage = getStorage(app);