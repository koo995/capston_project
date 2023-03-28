import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Card } from "antd";
import "./PostDetail.scss";
import CommentList from "components/CommentList";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((response) => {
        console.log("여기 postDetail response.data: ", response.data);
        setPost(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container" style={{ marginLeft: "30px" }}>
      <h1>질문</h1>
      <Card
        title={post.title}
        extra={
          <>
            <Avatar
              icon={
                <img
                  src={"http://localhost:8000" + post.author.avatar_url}
                  alt={post.author.nick_name}
                />
              }
              style={{ margin: "10px auto" }}
            />
            <p>{post.author.nick_name}</p>
          </>
        }
        style={{ width: "800px" }}
      >
        {post.photo && (
          <img src={post.photo} alt="이미지" style={{ width: "95%" }} />
        )}
        <p>{post.content}</p>
      </Card>
      <hr />
      <h1>답변</h1>
      <CommentList post={post} />
    </div>
  );
};

export default PostDetail;
