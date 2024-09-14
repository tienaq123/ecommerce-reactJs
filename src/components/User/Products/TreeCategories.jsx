import { TreeSelect, notification, Form } from "antd";
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/api-server";

const TreeDataExample = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log("Phản hồi từ API:", response);
        if (response.data && Array.isArray(response.data)) {
          const rootCategory = response.data.find(
            (category) => category.id === 1
          );
          if (rootCategory) {
            const formattedData = formatTreeData(rootCategory.children);
            console.log("Dữ liệu cây đã được định dạng:", formattedData);
            setTreeData(formattedData);
          }
        } else {
          console.error(
            "Đã mong đợi một mảng các danh mục nhưng nhận được:",
            response
          );
        }
      } catch (error) {
        notification.error({
          message: "Lỗi khi tải danh mục!",
          description: error.message,
        });
      }
    };

    fetchCategories();
  }, []);
  const formatTreeData = (categories) => {
    return categories.map((category) => ({
      title: category.name,
      value: category.id,
      children: category.children ? formatTreeData(category.children) : [],
    }));
  };
  return (
    <>
      <h1 className="text-lg pb-2 font-semibold">Danh mục</h1>
      <Form.Item name="category">
        <TreeSelect
          treeData={treeData}
          placeholder="Chọn danh mục"
          treeDefaultExpandAll
          allowClear
        />
      </Form.Item>
    </>
  );
};

export default TreeDataExample;
