import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import PropsTypes from "prop-types";
import { Avatar, Button, Card, Popover, List, Comment } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id); //id가 없다면 undifined
  const [liked, setLiked] = useState(false);
  const [commentFormOpen, setCommentFormOpen] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpen((prev) => !prev);
  }, []);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart-Twotone"
              onClick={onToggleLike}
            />
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
                    <Button>삭제</Button>
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
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
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
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
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
