import Head from "next/head";
import React, { useCallback, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../components/hooks/useInput";

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
    setTermError(false);
  };

  const onSubmit = useCallback(() => {
    if (password !== passwordConfirm) {
      return passwordError(true);
    }
    if (!term) {
      setTermError(true);
    }
    console.log(id, password, nickname);
  }, []);
  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-id">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">패스워드</label>
          <br />
          <Input
            name="user-password"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
          />
        </div>

        <div>
          <label htmlFor="user-password">패스워드 확인</label>
          <br />
          <Input
            name="user-passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            required
          />
        </div>
        {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          동의 하시나요?
        </Checkbox>
        {termError && <div>약관에 동의해주세요.</div>}
        <Button type="primary" htmlType="submit">
          가입하기
        </Button>
      </Form>
    </AppLayout>
  );
};

export default Signup;
