import React, { useCallback } from "react";
import { Card, Button, Avatar } from "antd";
import { logoutRequestAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  });
  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            짹짹 <br />
            {currentUser.Posts.length}
          </div>,
          <div key="following">
            팔로잉 <br />
            {currentUser.Followings.length}
          </div>,
          <div key="followers">
            팔로워 <br />
            {currentUser.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{currentUser.nickname[0]}</Avatar>} title={currentUser.nickname} />
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
