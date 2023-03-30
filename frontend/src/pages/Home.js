import PostList from "components/PostList";
import React, { useState, createContext, useContext } from "react";
import AppLayout from "components/Layout/AppLayout";
import Tagbar from "components/Layout/Tagbar";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const TagsContext = createContext();

function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/posts/new");
  };
  const postNewButton = //html element을 꼭 return안에서만 만들어야 하는것은 아니고 여기서 이렇게 만들고 전달도 가능하다
    (
      <>
        <Button
          type="primary"
          block
          style={{ marginBottom: "1rem" }}
          onClick={handleClick}
        >
          질문하기
        </Button>
      </>
    );

  //여기는 tag관련됨
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  //이 부분 처리하는데 꽤나 했갈렸다... 컴포넌트형식으로 전달해야 되는구나
  return (
    <TagsContext.Provider value={selectedTags}>
      <AppLayout
        tagbar={<Tagbar onTagClick={handleChange} />}
        children={<PostList selectedTags={selectedTags} />}
        postNewButton={postNewButton}
      />
    </TagsContext.Provider>
  );
}

//다른 컴포넌트에서 useContext(TagsContext)이 부분에 TagsContext을 인식하지 못해서 이렇게 했는데 다른방법?
export const useTagsContext = () => useContext(TagsContext);

export default Home;
