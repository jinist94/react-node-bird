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
      Comment: [
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
  postAdded: false,
};

const dummyPost = {
  id: 1,
  content: "새 게시물",
  User: {
    id: 1,
    nickname: "jay",
  },
  Images: [],
  Comment: [],
};
const ADD_POST = "ADD_POST";

export const addPost = () => {
  return { type: ADD_POST };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
