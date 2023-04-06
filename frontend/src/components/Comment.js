import React from "react";
import { Avatar, Card } from "antd";

export default function Comment({ comment }) {
  const {
    author: { username, nick_name, avatar_url },
    content,
    created_at,
  } = comment;
  return (
    <Card
      title={
        <>
          <Avatar icon={<img src={avatar_url} alt={nick_name} />} />
        </>
      }
    >
      <p>{content}</p>
    </Card>
  );
}
