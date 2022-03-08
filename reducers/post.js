import shortId from "shortid";

const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Jay",
      },
      content: "첫 번째 게시글 #해시태그 #안녕",
      Images: [
        { src: "http://placeimg.com/500/500/any" },
        { src: "http://placeimg.com/500/500/any?t=1646262890637" },
        { src: "http://placeimg.com/500/500/any?t=1646262899837" },
      ],
      Comments: [
        {
          User: {
            nickname: "Hay",
          },
          content: "신나는 Next.js",
        },
        {
          User: {
            nickname: "Hoy",
          },
          content: "즐거운 코딩",
        },
      ],
    },
  ],
  ImagePath: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
};

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "jay",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: "Hay",
  },
  content: data,
});

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPostRequest = (data) => {
  return { type: ADD_POST_REQUEST, data };
};

export const addCommentRequest = (data) => {
  return { type: ADD_COMMENT_REQUEST, data };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS:
      // content, postId, userId
      const PostIndex = state.mainPosts.findIndex((item) => item.id === action.data.postId);
      const Posts = { ...state.mainPosts[PostIndex] };
      Posts.Comments = [dummyComment(action.data.content), ...Posts.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[PostIndex] = Posts;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
