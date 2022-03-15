import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log("Logger :", action);
    return next(action);
  };

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); // saga생성
  const middleware = [sagaMiddleware, loggerMiddleware]; //saga 추가
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware)) // 배포용
      : composeWithDevTools(applyMiddleware(...middleware)); // 개발용
  const store = createStore(reducer, enhancer);

  store.sagaTask = sagaMiddleware.run(rootSaga); //sagaTask에 담기
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
