import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login, getUserId } from "../../api/api-server"; // Import phương thức từ api-server

const SigninAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await login(formData); // Sử dụng phương thức login từ api-server
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      const userResponse = await getUserId(response.token); // Lấy thông tin người dùng
      const user = userResponse.data;

      if (user.role === "admin") {
        message.success("Đăng nhập thành công!");
        navigate("/admin");
      } else {
        message.error("Bạn không có quyền truy cập trang admin.");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response?.data?.message || "Đăng nhập không thành công. Vui lòng kiểm tra lại email hoặc mật khẩu."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    await loginUser(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="font-bold text-center text-gray-800 text-4xl mb-8">Đăng nhập Admin</h1>
        {errorMessage && <div className="mb-4 text-red-600 text-center">{errorMessage}</div>}
        <Form
          name="signin"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} className="flex items-center justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SigninAdmin;
