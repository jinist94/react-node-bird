import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const InfoWrapper = styled.div`
  padding: 1em;
`;

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  //isLoggedIn 변경 시 알아서 AppLayout컴포넌트가 리렌더링 됨

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Menu.Item>
      </Menu>

      <Row>
        <Col xs={24} md={6}>
          <InfoWrapper>
            {isLoggedIn ? <UserProfile /> : <LoginForm />}
          </InfoWrapper>
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          오른쪽메뉴
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
