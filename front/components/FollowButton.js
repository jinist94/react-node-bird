import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const { currentUser, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isFollowing = currentUser?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.proptypes = {
  post: PropTypes.shape({
    //shape를 사용하면 object안의 속성들까지 설정할 수 있음
    id: PropTypes.number,
    content: PropTypes.string,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    Images: PropTypes.arrayOf(PropTypes.object), //객체들의 배열
    Comments: PropTypes.arrayOf(PropTypes.object), //객체들의 배열
  }).isRequired,
};

export default FollowButton;
