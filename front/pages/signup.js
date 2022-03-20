import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../components/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { signupRequestAction } from "../reducers/user";
import Router from "next/router";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      Router.replace("/");
    }
  }, [currentUser && currentUser.id]); //  currentUser이 있다면 redirect

  useEffect(() => {
    if (signUpDone) Router.replace("/"); //next이기 때문에 Router.push사용
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError); //alert 보다는 창을 띄워주는게 좋음
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput("");
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
    dispatch(signupRequestAction({ email, nickname, password }));
  }, [email, nickname, password, passwordConfirm]);
  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
        </div>
        <div>
          <label htmlFor="user-password">패스워드</label>
          <br />
          <Input name="user-password" value={password} type="password" onChange={onChangePassword} required />
        </div>

        <div>
          <label htmlFor="user-password">패스워드 확인</label>
          <br />
          <Input name="user-passwordConfirm" type="password" value={passwordConfirm} onChange={onChangePasswordConfirm} required />
        </div>
        {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          동의 하시나요?
        </Checkbox>
        {termError && !term && <div>약관에 동의해주세요.</div>}
        <Button type="primary" htmlType="submit" loading={signUpLoading}>
          가입하기
        </Button>
      </Form>
    </AppLayout>
  );
};

export default Signup;
