import { all, fork, takeLatest, put, call, delay, throttle } from "redux-saga/effects";
import axios from "axios";
import shortId from "shortid";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
  LOAD_POSTS_REQUEST,
} from "../reducers/post";

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function loadPostsAPI(data) {
  // 여기는 제너레이터가 아님
  return axios.post("/api/posts", data);
}

function addPostAPI(data) {
  // 여기는 제너레이터가 아님
  return axios.post("/api/post", data);
}

function removePostAPI(data) {
  // 여기는 제너레이터가 아님
  return axios.delete("/api/post", data);
}

function addCommentAPI(data) {
  // 여기는 제너레이터가 아님
  return axios.post("/api/comment", data);
}

function* loadPosts(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function* addPost(action) {
  try {
    const id = shortId.generate();
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    console.log("addCommit");
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
