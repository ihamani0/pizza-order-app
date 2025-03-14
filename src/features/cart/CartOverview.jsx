import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { useSelector } from "react-redux";
import { getTotalePrice, getTotaleQuantity } from "./CartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cart = useSelector((state) => state.Cart.cart);
  const totalPrice = useSelector(getTotalePrice);
  const totalQuantity = useSelector(getTotaleQuantity);

  if (cart.length === 0) return null;
  return (
    <div className="bg-secondary text-third border-secondary border-t-4 px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="space-x-2 font-mono font-semibold md:text-lg">
          <span className="text-stone-600">{totalQuantity} pizzas</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <LinkButton to="/cart">Open cart &rarr;</LinkButton>
      </div>
    </div>
  );
}

export default CartOverview;
