import { Space, Tag } from "antd";
import { useState, useEffect } from "react";
import { useAxios } from "api";

const { CheckableTag } = Tag;

function TagList() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [{ data: TagsData, loading, error }, refetch] = useAxios({
    url: `/api/tags/`,
  });

  useEffect(() => {
    setTags(TagsData);
  }, [TagsData]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

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
          tags.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
      </Space>
    </>
  );
}
export default TagList;
