import React, { useCallback } from "react";
import { Button, Form, Input } from "antd";
import PropsTypes from "prop-types";
import useInput from "./hooks/useInput";
import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]); // [commentText] 안 쓰면 commentText가 빈값으로 나옴
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button type="primary" htmlType="submit">
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
