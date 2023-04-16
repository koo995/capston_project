import React from "react";
import { Card, Avatar, List, Space } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./Post.scss";
import moment from "moment";
import "moment/locale/ko";

function Post({ post }) {
  const { Meta } = Card;
  const history = useHistory();
  const { author, title, content, photo, caption, created_at, comment_count } =
    post;
  const { avatar_url, nick_name } = author;

  const handleCardClick = () => {
    history.push(`/posts/${post.id}`); // Replace 'post.id' with the actual post ID property
  };
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List.Item
      onClick={handleCardClick}
      style={{
        width: 950,
        height: 170,
        border: "1px solid lightgray",
        padding: 5,
        cursor: "pointer",
      }}
      //여기에서 style을 post-card로 다 옮기니 적용이 없어지고... 이 라인 하는것도 없는데 삭제하면 마진이 삭제되고... 왜 그렇지
      className="post-card"
      extra={
        <img
          alt="example"
          src={photo}
          style={{ width: "150px", height: "150px", margin: "5px auto" }}
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar icon={<img src={avatar_url} alt={"아바타"} />} />}
        title={
          <>
            <div style={{ color: "lightBlue" }}>{caption}</div>
            <div>{title}</div>
          </>
        }
        description={
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              {moment(created_at).format("YYYY/MM/DD hh:mm")}
            </div>
            <div>
              <IconText
                icon={MessageOutlined}
                text={comment_count}
                key="list-vertical-message"
              />
            </div>
          </div>
        }
      />
      <div style={{ height: "40px" }} className="long-content">
        {content}
      </div>
    </List.Item>
  );
}

export default Post;
