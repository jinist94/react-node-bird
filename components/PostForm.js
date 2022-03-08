import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "./hooks/useInput";
import { addPostRequest } from "../reducers/post";

const PostForm = () => {
  const { ImagePath, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput("");
  const imageRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) setText(""); // 포스트가 정상적으로 등록되고 난 후에 초기화를 해야함
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPostRequest(text));
  }, [text]);

  const onImageUploadClick = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);

  return (
    <>
      <Form encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea value={text} onChange={onChangeText} placeholder="새 포스트 작성" />
        <div>
          <input id="input-file" type="file" multiple hidden ref={imageRef} />
          <label htmlFor="input-file">이미지업로드</label>
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
