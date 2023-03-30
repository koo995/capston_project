import React from "react";
import { Card, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import "./Post.scss";

function Post({ post }) {
  const { Meta } = Card;
  const history = useHistory();
  const { author, title, content, photo, caption } = post;
  const { avatar_url, nick_name } = author;

  const handleCardClick = () => {
    history.push(`/posts/${post.id}`); // Replace 'post.id' with the actual post ID property
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      style={{
        width: 320,
        height: 400,
        border: "2px solid Black",
      }}
      className="post-card"
      cover={
        <img
          alt="example"
          src={photo}
          style={{ width: "300px", height: "150px", margin: "5px auto" }}
        />
      }
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
        description={<div className="long-content">{content}</div>}
      />
      <hr />
      <div>{caption}</div>
    </Card>
  );
}

export default Post;
