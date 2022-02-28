import { Form, Input } from "antd";
import React from "react";

const NicknameEditForm = ({ header, data }) => {
  return (
    <>
      <Form>
        <Input.Search addonBefore="닉네임" enterButton="수정" />
      </Form>
    </>
  );
};

export default NicknameEditForm;
