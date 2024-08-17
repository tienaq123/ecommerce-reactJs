import Logo from "../Home/Logo";
import CartQuantity from "../Cart/CartQuantity";

const Header = () => {
  return (
    <div className="header-checkout border-b ">
      <div className="container mx-auto px-40 py-4">
        <div className="flex justify-between">
          <Logo />
          <ul>
            <CartQuantity />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
