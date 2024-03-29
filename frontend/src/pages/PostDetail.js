import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "api";
import { Avatar, Card } from "antd";
import "./PostDetail.scss";
import CommentList from "components/CommentList";
import AppLayout from "components/Layout/AppLayout";
import AlertSidebar from "components/Layout/AlertSidebar";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/posts/${id}`)
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
    <AppLayout alertSidebar={<AlertSidebar />}>
      <div className="card-container" style={{ marginLeft: "30px" }}>
        <h1>질문</h1>
        <Card
          title={post.title}
          extra={
            <>
              <Avatar
                icon={
                  <img
                    src={post.author.avatar_url}
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
    </AppLayout>
  );
};

export default PostDetail;
