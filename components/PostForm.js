import { Button, Form, Input } from "antd";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "./hooks/useInput";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const { ImagePath } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput("");
  const imageRef = useRef();
  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch(addPost());
    setText("");
  }, []);
  const onImageUploadClick = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);
  return (
    <>
      <Form encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          placeholder="새 포스트 작성"
        />
        <div>
          <input id="input-file" type="file" multiple hidden ref={imageRef} />
          <label for="input-file">이미지업로드</label>
          <Button onClick={onImageUploadClick}>이미지 업로드</Button>
          <Button type="primary" htmlType="submit">
            짹짹
          </Button>
        </div>
        <div>
          {ImagePath.map((v) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: 200 }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </>
  );
};

export default PostForm;
