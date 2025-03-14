import DeleteButton from "../../ui/DeleteButton";
import { formatCurrency } from "../../utils/helpers";
import QuantityButton from "../../ui/QuantityButton";
import { useSelector } from "react-redux";
import { checkPizzaInMenu } from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(checkPizzaInMenu(pizzaId));

  return (
    <li className="my-2 flex items-center justify-between gap-6 px-3 py-2 font-mono">
      <div className="flex grow items-start justify-between">
        <p className="font-semibold">
          {quantity}&times; {name}
        </p>
        <div>
          <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        </div>
      </div>
      {/* delete button */}
      <DeleteButton pizzaId={pizzaId} />
      <QuantityButton pizzaId={pizzaId} currentQuantity={currentQuantity} />
    </li>
  );
}

export default CartItem;
