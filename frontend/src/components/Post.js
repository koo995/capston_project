import React from "react";

function Post({ post }) {
  const { author, content, photo, caption } = post;
  return (
    <div>
      {JSON.stringify(author)}
      {content}
      <img src={photo} alt={photo} style={{ width: "100px" }} /> {caption}
    </div>
  );
}

export default Post;
