import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { Alert, Pagination } from "antd";
import "./PostList.scss";
import { useAppContext } from "store";

const apiurl = "http://localhost:8000/api/posts";

function PostList({ selectedTags }) {
  const [postList, setPostList] = useState([]);
  //여기까지 토큰이 잘 전달되었는지 확인하기위함
  const { store } = useAppContext();
  console.log("store: ", store);

  useEffect(() => {
    let apiUrl = apiurl;
    if (selectedTags && selectedTags.length > 0) {
      apiUrl += `?tags=${selectedTags.join(",")}`;
    }
    Axios.get(apiUrl)
      .then((response) => {
        const { data } = response;
        console.log("response data: ", data);
        setPostList(data);
      })
      .catch();
  }, [selectedTags]);

  return (
    <>
      <div className="post-list-container">
        {postList.length === 0 && (
          <Alert type="warning" message="포스팅이 없습니다" />
        )}
        {/* postList에서 꺼내온 녀석은 object이니까 render가 안된다? JSON.stringify을 이용한다 */}
        <div className="post-list-grid">
          {postList.map((post) => {
            return <Post post={post} key={post.id} />; //backend에서 serializer로 id값을 표기안했더니 post.id값이 없는 값이었네
          })}
        </div>
      </div>
      <div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </>
  );
}

export default PostList;
