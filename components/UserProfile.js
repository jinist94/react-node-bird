import React, { useCallback } from "react";
import { Card, Button, Avatar } from "antd";

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
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
