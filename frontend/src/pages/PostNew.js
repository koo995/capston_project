import { Card } from "antd";
import PostNewForm from "components/PostNewForm";
import React, { useState } from "react";
import AppLayout from "components/Layout/AppLayout";

export default function PostNew() {
  return (
    <AppLayout>
      <div className="PostNew">
        <Card title="질문하기">
          <PostNewForm />
        </Card>
      </div>
    </AppLayout>
  );
}
