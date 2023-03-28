import React, { useState } from "react";
import { Button, Input } from "antd";
// import { axiosInstance, useAxios } from "api";
import useAxios from "axios-hooks";
import { useAppContext } from "store";
import Comment from "./Comment";
import Axios from "axios";

export default function CommentList({ post }) {
  const { store, dispatch } = useAppContext();
  const { jwtAccessToken, isAuthenticated } = store;
  const [content, setCommentContent] = useState("");

  const headers = { Authorization: `Bearer ${jwtAccessToken}` };

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `http://localhost:8000/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`;

    console.group("handleCommentSave");
    try {
      const response = await Axios.post(apiUrl, { content }, { headers });
      console.log(response);
      setCommentContent("");
      refetch();
    } catch (error) {
      console.log(error);
    }

    console.groupEnd();
  };

  return (
    <div>
      {commentList &&
        commentList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        value={content}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={content.length === 0}
        onClick={handleCommentSave}
      >
        답변하기
      </Button>
    </div>
  );
}
