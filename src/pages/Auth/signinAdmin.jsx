import { useState } from "react";
import { Button, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";
import { login } from "../../api/api-server"; // Import phương thức từ api-server
import { getAdminLocalStorage } from "../../utils/indexUtils";

const SigninAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(localStorage.getItem("tokenAdmin"));

  const loginAdmin = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await login(formData); // Sử dụng phương thức login từ api-server
      const user = response.data;
      const role = user.role;
      console.log(user);

      if (role === "admin") {
        console.log(role);

        message.success("Đăng nhập thành công!");
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("admin", JSON.stringify(response.data));
        // localStorage.setItem("admin", false);
        const tokenFormLocal = getAdminLocalStorage();
        console.log(tokenFormLocal);

        navigate("/admin");
      } else {
        message.error("Bạn không có quyền truy cập trang admin.");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response?.data?.message ||
          "Đăng nhập không thành công. Vui lòng kiểm tra lại email hoặc mật khẩu."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    await loginAdmin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="font-bold text-center text-gray-800 text-4xl mb-8">
          Admin
        </h1>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}
        <Form
          name="signin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </Form.Item>
          <Form.Item className="w-full">
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

