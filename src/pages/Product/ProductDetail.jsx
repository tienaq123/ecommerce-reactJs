import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductId } from "../../api/api-server";
import SuggestedProducts from "../../components/UI/Home/SuggestedProducts";
import ProductInforDetail from "../../components/UI/Product/ProductInforDetail.jsx";
import ProductImageDetail from "../../components/UI/Product/ProductImageDetail.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState([]);

  console.log("selected", selectedVariant);
  console.log(mainImage);

  console.log(data);

  const fetchProductDetail = async (id) => {
    const response = await getProductId(id);

    setData(response.data);
    setSelectedVariant(response.data.productVariants[0]);
    setMainImage(response.data.productImages);
  };

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  return (
    <div className="md:pt-10">
      <div
        className="content container mx-auto md:px-20 my-2"
        style={{ minHeight: "140vh" }}
      >
        <div className="md:flex">
          <ProductImageDetail mainImage={mainImage} />
          <ProductInforDetail
            data={data}
            id={id}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
        <SuggestedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
