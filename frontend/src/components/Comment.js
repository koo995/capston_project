import React from "react";
import { Avatar, Card } from "antd";

export default function Comment({ comment }) {
  const {
    author: { username, nick_name, avatar_url },
    content,
    created_at,
  } = comment;
  const displayName = nick_name.length === 0 ? nick_name : username;
  return (
    <Card
      title={
        <>
          <Avatar
            icon={
              <img src={"http://localhost:8000" + avatar_url} alt={nick_name} />
            }
          />
        </>
      }
    >
      <p>{content}</p>
    </Card>
  );
}
