import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

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
      <h2>PostList</h2>
      {postList.map((post) => (
        // key할당했는데 왜 계속 경고가 뜨지?
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
