import React, { useState } from "react";
import { Card, Form, Input, Button, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useAppContext } from "store";
import { useHistory } from "react-router-dom";

export default function PostNewForm() {
  const {
    store: { jwtAccessToken },
  } = useAppContext();
  const history = useHistory();
  const [file, setFile] = useState("");
  const handleUploadChange = ({ file }) => {
    setFile(file);
  };

  const handleFinish = async (fieldValues) => {
    const { title, content, caption, photo } = fieldValues;
    const formData = new FormData(); //이건 단순히 자바스크립트 문법이라네? 이름 그대로로 생각하면 되나?
    formData.append("title", title);
    formData.append("content", content);
    formData.append("caption", caption);
    if (photo?.file) {
      formData.append("photo", photo.file);
    }

    const headers = { Authorization: `Bearer ${jwtAccessToken}` };
    try {
      const response = await Axios.post(
        "http://127.0.0.1:8000/api/posts/",
        formData,
        {
          headers,
        }
      );
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error); //이것을 통해 어떤 에러가 있었는지 자세히 알 수 있다.
    }
  };

  return (
    <Form
      labelCol={{ span: 8 }} //부트스트랩은 한 행이 12 컬럼인데 antd는 24컬럼임
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 1000 }}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="제목"
        name="title"
        rules={[{ required: true, message: "제목을 입력해 주세요" }]} //rules을 통해 유효성검사로직이 들어가 잇다
      >
        <Input />
        {/* antd에서 여러줄로 입력할수 있게 TextArea같은 것을 지원해 준다 */}
      </Form.Item>
      <Form.Item
        label="내용"
        name="content"
        rules={[{ required: true, message: "내용을 입력해 주세요" }]} //rules을 통해 유효성검사로직이 들어가 잇다
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="태그"
        name="caption"
        rules={[{ required: true, message: "태그를 입력해 주세요" }]} //rules을 통해 유효성검사로직이 들어가 잇다
      >
        <Input />
      </Form.Item>

      <Form.Item label="사진" name="photo">
        <Upload
          listType="picture-card"
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
        >
          {file ? null : ( //여기에 왜 중괄호를 써야하지?
            //The expression inside the braces will be evaluated, and the result will be rendered.
            //그냥 쓰면 문자그대로 렌더링될꺼야
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      {/* //8칸 이동하고 16칸을 쓰겠다 */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <hr />
      </Form.Item>
    </Form>
  );
}
