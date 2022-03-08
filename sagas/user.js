import { fork, all, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  // 여기는 제너레이터가 아님
  return axios.post("/api/login", data);
}

function logOutAPI() {
  // 여기는 제너레이터가 아님
  return axios.post("/api/logout");
}

function* logIn(action) {
  try {
    console.log("saga Reqeust");
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: error.response.data,
    });
  }
}

function* logOut(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  console.log("watchLogin");
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  console.log("userSata start aaaaa");
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
