import { all, fork } from "redux-saga/effects";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
