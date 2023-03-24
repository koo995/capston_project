import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
} from "use-reducer-with-side-effects";
//store.js는 login이 되었을때 발급된 토큰을 모든 컴포넌트에서 공유하기 위해서 사용되는 녀석이다
//store라는 변수에 토큰을 저장해서 공유할려고 한다.

const AppContext = createContext();

const reducer = (prevState, action) => {
  //외부로 노출을 안할 것
  //reducer은 언제나 순수함수로 구현해야함
  //사이드이펙트로 token을 set할때 로컬스토리지에 저장하고 싶다
  const { type } = action;
  if (type === SET_TOKEN) {
    // 로그인일때?
    const { payload: jwtAccessToken } = action; //원래 key명이 jwtAccessToken이니 변경해 준다
    const newState = { ...prevState, jwtAccessToken, isAuthenticated: true };
    //이 반환하는 함수는 뭐지? store을 업데이트하기위한 함수인가? 그 다음 변수는 sideEffect로 실행할 함수이고?
    //state 와 dispatch는 안쓰이니까 지워도 된다.
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtAccessToken", jwtAccessToken);
    });
  } else if (type === DELETE_TOKEN) {
    //로그아웃일때?
    const newState = {
      ...prevState,
      jwtAccessToken: "",
      isAuthenticated: false,
    };
    return UpdateWithSideEffect(newState, () => {
      setStorageItem("jwtAccessToken", "");
    });
  }
  return prevState; //이녀석은 왜있지?
};

//원래는 AppContext.provider이렇게 쓸것을 별도의 컴포넌트를 만들어 준다.
export const AppProvider = ({ children }) => {
  const jwtAccessToken = getStorageItem("jwtAccessToken", "");
  const [store, dispatch] = useReducerWithSideEffects(
    //원래의 usereducer은 3개의 인자를 받는데 여기서는 2개의 인자만 받는다
    reducer,
    {
      jwtAccessToken,
      isAuthenticated: jwtAccessToken.length > 0, //이것을 하나 추가?
    } //훅이 아닌 일반 function이니 사용가능?
  );
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); //값을 읽어올땐 다른 컴포넌트에서 이것으로 읽어온다

//action
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//action creators 실제 action을 노출하지는 않는다?
export const setToken = (token) => ({ type: SET_TOKEN, payload: token }); //payload는 해당 action과 관련된 데이터
export const deleteToken = () => ({ type: DELETE_TOKEN });
