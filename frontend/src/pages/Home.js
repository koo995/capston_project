import PostList from "components/PostList";
import React from "react";
import AppLayout from "components/Layout/AppLayout";
import Tagbar from "components/Layout/Tagbar";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

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
  //이 부분 처리하는데 꽤나 했갈렸다... 컴포넌트형식으로 전달해야 되는구나
  return (
    <AppLayout
      tagbar={<Tagbar />}
      children={<PostList />}
      postNewButton={postNewButton}
    />
  );
}

export default Home;
