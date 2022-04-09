import React from "react";
import PropTypes from "prop-types";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
  console.log(data);
  return (
    <>
      <List
        size="small"
        grid={{ gutter: 4, xs: 2, md: 3 }}
        header={<div>{header}</div>}
        loadMore={
          <div>
            <Button>더 보기</Button>
          </div>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<StopOutlined key="stop" />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
