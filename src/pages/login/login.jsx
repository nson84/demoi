import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CallLogin } from "../../services/axios";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../redux/account/accountSlide";

const Login = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const res = await CallLogin(username, password);
      setLoading(true);
      console.log("Success:", values);
      if (res?.data) {
        setLoading(false);
        localStorage.setItem("access_token", res.data.access_token);
        dispatch(LoginAction(res.data.user));
        message.success("login sucess");
        navigator("/");
      } else {
        notification.error({
          message: "login faile",
          description: res?.message || "có lỗi khi đăng nhập",
        });
      }
    } catch (error) {
      notification.error({
        message: "error login",
        description: error?.response?.data?.message || "có lỗi khi đăng nhập",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          style={{
            maxWidth: "500px",
            margin: "150px auto",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h3
            style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Login
          </h3>

          <Form.Item
            label="Email"
            name="username"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <div>
              <Checkbox>Remember me</Checkbox>
              <div style={{ marginTop: "10px" }}>
                <span>
                  bạn chưa có tài khoản ? <Link to={"/register"}>register</Link>
                </span>
              </div>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    </div>
  );
};

export default Login;
