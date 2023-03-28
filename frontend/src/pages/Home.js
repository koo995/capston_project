import PostList from "components/PostList";
import React from "react";
import AppLayout from "components/Layout/AppLayout";
import Tagbar from "components/Layout/Tagbar";

function Home() {
  //이 부분 처리하는데 꽤나 했갈렸다... 컴포넌트형식으로 전달해야 되는구나
  return <AppLayout tagbar={<Tagbar />} children={<PostList />} />;
}

export default Home;
