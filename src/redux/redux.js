import { configureStore } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  displayName: '',
  UID: '',
};

// 리듀서 함수
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DISPLAYNAME':// 유저 이름 저장
        return { ...state, displayName: action.payload };
      case 'SET_ID': // ID 저장
        return { ...state, UID: action.payload };
    default:
        return state;
    }
};

// 스토어 생성
const store = configureStore({
  reducer: rootReducer,
});

export default store;
