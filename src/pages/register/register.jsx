import { Button, Checkbox, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Callregister } from "../../services/axios";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    try {
      let res = await Callregister(fullName, email, password, phone);
      setLoading(true);
      if (res?.data?._id) {
        setLoading(false);
        
        message.success("Register success");
        Navigate("/login");
      } else {
        notification.error({
          message: "Register failed",
          description:
            res?.message ||
            "There was an error during registration. Please try again.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Register failed",
        description:
          error?.response?.data?.message ||
          "There was an error during registration. Please try again.",
      });
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
          Register
        </h3>
        <Form.Item
          label="Username"
          name="fullName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
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
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
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
                Bạn đã có tài khoản? <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
