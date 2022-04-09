import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>내 프로필</title>
      </Head>
      <div>내 프로필</div>
    </AppLayout>
  );
};

export default Profile;
