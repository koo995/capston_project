import React from "react";
import { Card, Avatar, List, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import "./Post.scss";
import moment from "moment";
// 한글로 출력되게 해준다.
import "moment/locale/ko";

function Post({ post }) {
  const { Meta } = Card;
  const history = useHistory();
  const { author, title, content, photo, caption, created_at } = post;
  const { avatar_url, nick_name } = author;

  const handleCardClick = () => {
    history.push(`/posts/${post.id}`); // Replace 'post.id' with the actual post ID property
  };

  return (
    <List.Item
      onClick={handleCardClick}
      style={{
        width: 950,
        height: 170,
        border: "1px solid lightgray",
        padding: 5,
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
        title={title}
        description={
          <span>{moment(created_at).format("YYYY/MM/DD hh:mm")}</span>
        }
      />
      <div style={{ height: "40px" }} className="long-content">
        {content}
      </div>
      <hr />
      <div>{caption}</div>
    </List.Item>
  );
}

export default Post;
