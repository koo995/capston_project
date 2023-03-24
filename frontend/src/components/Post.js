import React from "react";
import { Card, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./Post.scss";

function Post({ post }) {
  const { Meta } = Card;

  const { author, title, content, photo, caption } = post;
  const { avatar_url, nick_name } = author;
  return (
    <Card
      hoverable
      style={{
        width: 300,
        border: "2px solid Black",
      }}
      className="post-card"
      cover={<img alt="example" src={photo} style={{ width: "95%" }} />}
      // actions={[<EditOutlined key="edit" />]}
    >
      <Meta
        avatar={
          <Avatar
            icon={
              <img src={"http://localhost:8000" + avatar_url} alt={"아바타"} />
            }
          />
        }
        title={title}
        description={content}
      />
      <hr />
      <div>{caption}</div>
    </Card>
  );
}

export default Post;
