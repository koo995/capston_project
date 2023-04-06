import { Space, Tag } from "antd";
import React, { useState, useEffect, useContext } from "react";
import useAxios from "axios-hooks";
import { useTagsContext } from "pages/Home";

const { CheckableTag } = Tag;

export default function Tagbar({ onTagClick }) {
  const [tags, setTags] = useState([]);
  const selectedTags = useTagsContext();
  console.log("여기 selectedTag: ", selectedTags);
  const [{ data: TagsData, loading, error }, refetch] = useAxios({
    url: `http://localhost:8000/api/tags/`,
  });
  console.log("여기 Tags 데이터야: ", TagsData);

  useEffect(() => {
    setTags(TagsData);
  }, [TagsData]);

  return (
    <>
      <span
        style={{
          marginRight: 8,
        }}
      >
        Categories:
      </span>
      <Space size={[0, 8]} wrap>
        {tags &&
          tags.map((tag, index) => (
            <CheckableTag
              key={index}
              checked={selectedTags.includes(tag.name)}
              onChange={(checked) => onTagClick(tag.name, checked)}
            >
              #{tag.name}
            </CheckableTag>
          ))}
      </Space>
    </>
  );
}
