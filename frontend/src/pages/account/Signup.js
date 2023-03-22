import React, { useState } from "react";
import { Button, Card, Form, Input, notification, Upload } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";

export default function Signip() {
  const history = useHistory();
  // const [fieldErrors, setFieldErrors] = useState({});
  const [file, setFile] = useState("");

  const handleUploadChange = ({ file }) => {
    setFile(file);
    console.log("여기 file: ", file);
  };

  const onFinish = (values) => {
    async function fn() {
      const { username, password, avatar, nick_name, email } = values;

      const formData = new FormData(); //이건 단순히 자바스크립트 문법이라네? 이름 그대로로 생각하면 되나?
      formData.append("username", username);
      formData.append("password", password);
      formData.append("nick_name", nick_name);
      formData.append("email", email ? email : "");
      if (avatar?.file) {
        //이 부분 chatgpt로 해결... 굿
        formData.append("avatar", avatar.file);
      }

      // setFieldErrors({});
      try {
        await Axios.post("http://127.0.0.1:8000/account/signup/", formData);
        notification.open({
          message: "회원가입 성공!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          description: "로그인 페이지로 이동합니다.",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        history.push("/account/login");
      } catch (error) {
        console.log(error);

        if (error.response) {
          notification.open({
            message: "회원가입 실패!",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
            description: "아이디/암호를 확인해 주세요.",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });

          const { data: fieldsErrorMessages } = error.response;
          console.log("fieldsErrorMessages: ", fieldsErrorMessages);
        }
      }
    }
    fn(); //위에서 fn()을 정의하고 여기서 호출한다.
    console.log("on finish로 전달받은 values: ", values);
  };

  return (
    <Card title="회원가입">
      <Form
        labelCol={{ span: 8 }} //부트스트랩은 한 행이 12 컬럼인데 antd는 24컬럼임
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="아이디"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]} //rules을 통해 유효성검사로직이 들어가 잇다
          //hasFeedback //username의 끝 부분에 체크표시?
          //{...fieldErrors.username}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 5, message: "5자리 이상 해주세요" }, // 한글자 한글자 들어갈때마다 검사해준다.
          ]}
          //{...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="닉네임" name="nick_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* FIXME 회원가입에 아무것도 안넣어도 되도록. undefined가 들어가서 오류가 뜬다 */}
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="아바타" name="avatar">
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
        </Form.Item>
      </Form>
    </Card>
  );
}
