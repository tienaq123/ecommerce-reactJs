import { Carousel } from "antd";
// import banner from "../../../assets/img/banner-homepage.png";
// import banner2 from "../../../assets/img/banner-homepage2.png";
import { useEffect, useState } from "react";
import { getBanners } from "../../../api/api-server";
import { Link, NavLink } from "react-router-dom";
const Banner = () => {
  const [state, setState] = useState([]);
  const getBannerPage = async () => {
    const response = await getBanners();
    setState(response.data);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  useEffect(() => {
    getBannerPage();
  }, []);
  return (
    <div className="box-border">
      <Carousel afterChange={onChange}>
        {state.map((data) => (
          <div key={data.id}>
            <NavLink to="/products">
              <img
                className="w-full"
                src={
                  "https://cdn.wconcept.com/contents/display/category/WUS/A01/contents/2372_27617_14_ENG_20240812175059.gif"
                }
                alt=""
              />
            </NavLink>
          </div>
        ))}
      </Carousel>
      <div className="w-full bg-stone-100 text-center py-2">
        <p className="">
          Get UPTO 40% OFF on your 1st order{" "}
          <Link to="/products">SHOP NOW</Link>
        </p>
      </div>
    </div>
  );
};

export default Banner;
