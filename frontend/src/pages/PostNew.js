import { Card } from "antd";
import PostNewForm from "components/PostNewForm";
import React, { useState } from "react";
import AppLayout from "components/Layout/AppLayout";

export default function PostNew() {
  return (
    <AppLayout>
      <Card title="질문하기" style={{ width: "1000px" }}>
        <PostNewForm />
      </Card>
    </AppLayout>
  );
}
