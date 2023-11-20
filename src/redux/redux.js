import { configureStore } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  userRealName: '',
  ID: '',
};

// 리듀서 함수
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERREALNAME':// 유저 이름 저장
        return { ...state, userRealName: action.payload };
      case 'SET_ID': // ID 저장
        return { ...state, ID: action.payload };
    default:
        return state;
    }
};

// 스토어 생성
const store = configureStore({
  reducer: rootReducer,
});

export default store;
