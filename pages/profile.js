import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
const Profile = () => {
  const followingList = [
    { nickname: "jay" },
    { nickname: "jay" },
    { nickname: "jay" },
  ];
  const followerList = [
    { nickname: "jay" },
    { nickname: "jay" },
    { nickname: "jay" },
  ];
  return (
    <>
      <AppLayout>
        <Head>
          <title>내 프로필</title>
        </Head>
        <div>내 프로필</div>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
