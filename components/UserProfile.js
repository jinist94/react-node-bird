import React, { useCallback } from "react";
import { Card, Button, Avatar } from "antd";
import { logoutRequestAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  });
  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            짹짹 <br />8
          </div>,
          <div key="following">
            팔로잉 <br />8
          </div>,
          <div key="followers">
            팔로워 <br />8
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
        <Button onClick={onLogOut} loading={isLoggingOut}>
          로그아웃
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
