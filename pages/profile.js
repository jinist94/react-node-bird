import Head from "next/head";
import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import Router from "next/router";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(currentUser && currentUser.id)) {
      Router.push("/");
    }
  }, [currentUser && currentUser.id]); //  로그아웃 했을 경우

  if (!currentUser) {
    return null; //me를 로딩하는 동안 보여줄 화면
  }
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
