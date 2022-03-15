import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import PropsTypes from "prop-types";
import useInput from "./hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) setCommentText(""); // 포스트가 정상적으로 등록되고 난 후에 초기화를 해야함
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText]); // [commentText] 안 쓰면 commentText가 빈값으로 나옴

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button style={{ zIndex: 1 }} type="primary" htmlType="submit" loading={addCommentLoading}>
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propsTypes = {
  post: PropsTypes.shape({
    //shape를 사용하면 object안의 속성들까지 설정할 수 있음
    id: PropsTypes.number,
    content: PropsTypes.string,
    User: PropsTypes.shape({
      id: PropsTypes.number,
      nickname: PropsTypes.string,
    }),
    Images: PropsTypes.arrayOf(PropsTypes.object), //객체들의 배열
    Comments: PropsTypes.arrayOf(PropsTypes.object), //객체들의 배열
  }).isRequired,
};

export default CommentForm;
