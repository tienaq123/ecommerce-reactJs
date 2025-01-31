import { useSelector } from "react-redux";
import { getCartFromLocalStorage } from "../../../utils/indexUtils";
import {
  calculateTotalPriceAll,
  formatCurrency,
} from "../../../utils/helperFunction";
import Coupons from "../Coupon/Coupons";
import { useState } from "react";

const OrderSummary = () => {
  const [discount, setDiscount] = useState(0);
  const [priceCheckout, setPriceCheckout] = useState(0);
  const cartItems = getCartFromLocalStorage();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const delivery = useSelector((state) => state.cart.shippingFee);
  const initPrice = calculateTotalPriceAll(totalPrice, delivery);
  // console.log(initPrice);
  // console.log(priceCheckout);
  return (
    <div className="md:size-3/5 px-6 md:pl-14 order-summary md:min-w-96 pb-6">
      <h2 className="text-base font-bold pb-5">Thông tin sản phẩm</h2>
      <div className="border-b pb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex py-2">
            <div className="img max-w-20 bg-stone-200">
              <img className="object-fill" src={item.product.image} alt="" />
            </div>
            <div className="content-order pl-4 text-stone-800">
              <p className="text-sm font-bold">{item.product.name}</p>
              <p className="text-xs">{item.variant.sku}</p>
              <p className="text-sm font-bold mt-16">
                {" "}
                {Number(item.product.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Coupons setDiscount={setDiscount} setPriceCheckout={setPriceCheckout} />
      <div className="price py-2 text-stone-600 text-sm">
        <div className="total-price flex justify-between pt-2">
          <p>Tổng giá trị sản phẩm</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        <div className="flex justify-between pt-2">
          <p>Vận chuyển</p>
          <p>{delivery > 0 ? `${formatCurrency(delivery)}` : "Free"}</p>
        </div>
        <div className="flex justify-between border-b py-2">
          <p>Khuyến mãi</p>
          <p>{discount > 0 ? <>{`- ${discount}%`}</> : <>{`0`}</>}</p>
        </div>
      </div>
      <div className="totalPrice flex justify-between text-xl py-2">
        <p className="font-bold">Tổng thanh toán</p>
        <p className="font-bold">
          {priceCheckout
            ? formatCurrency(priceCheckout)
            : formatCurrency(initPrice)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
