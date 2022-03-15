import React, { useCallback, useState } from "react";
import PropsTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card, Popover, List, Comment } from "antd";
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from "@ant-design/icons";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";

import { REMOVE_POST_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.currentUser?.id); //id가 없다면 undifined
  const { removePostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [commentFormOpen, setCommentFormOpen] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpen((prev) => !prev);
  }, []);

  const onClickRemove = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: post.id });
  }, []);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart-Twotone" onClick={onToggleLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button loading={removePostLoading} onClick={onClickRemove}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpen && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment author={item.User.nickname} avatar={<Avatar>{item.User.nickname[0]}</Avatar>} content={item.content} />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propsTypes = {
  post: PropsTypes.shape({
    //shape를 사용하면 object안의 속성들까지 설정할 수 있음
    id: PropsTypes.number,
    content: PropsTypes.string,
    User: PropsTypes.shape({
      id: PropsTypes.number,
      nickname: PropsTypes.string,
    }),
    Images: PropsTypes.arrayOf(PropsTypes.object), //객체들의 배열
    Comments: PropsTypes.arrayOf(PropsTypes.object), //객체들의 배열
  }).isRequired,
};

export default PostCard;
