import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { Alert, Pagination } from "antd";
import "./PostList.scss";

const apiurl = "http://localhost:8000/api/posts";

function PostList() {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios
      .get(apiurl)
      .then((response) => {
        const { data } = response;
        console.log("response data: ", data);
        setPostList(data);
      })
      .catch();
  }, []);

  return (
    <div>
      <div className="post-list-container">
        {postList.length === 0 && (
          <Alert type="warning" message="포스팅이 없습니다" />
        )}
        {/* postList에서 꺼내온 녀석은 object이니까 render가 안된다? JSON.stringify을 이용한다 */}
        <div className="post-list-grid">
          {postList.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
        </div>
      </div>
      <div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default PostList;
