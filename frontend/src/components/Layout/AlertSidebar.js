import React, { useEffect, useState } from "react";
import { Card, Alert } from "antd";
import { useParams } from "react-router-dom";
import { axiosInstance } from "api";
import PostCard from "components/PostCard";

function AlertSidebar() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/posts/${id}/similar`)
      .then((response) => {
        console.log("여기 유사한 포스트 들이야: ", response.data);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      {posts.length === 0 ? (
        <Alert type="warning" message="유사한 포스팅이 없습니다." />
      ) : (
        <div>
          <h2>혹시 비슷한 질문이지 않을까요?</h2>
          <hr />
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />; //backend에서 serializer로 id값을 표기안했더니 post.id값이 없는 값이었네
          })}
        </div>
      )}
      {/* postList에서 꺼내온 녀석은 object이니까 render가 안된다? JSON.stringify을 이용한다 */}
    </>
  );
}

export default AlertSidebar;
