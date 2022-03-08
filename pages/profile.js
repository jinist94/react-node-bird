import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <AppLayout>
        <Head>
          <title>내 프로필</title>
        </Head>
        <div>내 프로필</div>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={currentUser.Followings} />
        <FollowList header="팔로워 목록" data={currentUser.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
