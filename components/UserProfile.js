import React, { useCallback } from "react";
import { Card, Button, Avatar } from "antd";
import { logoutAction } from "../reducers/user";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
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
        <Card.Meta avatar={<Avatar>Jay</Avatar>} />
        <Button onClick={onLogOut}>로그아웃</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
