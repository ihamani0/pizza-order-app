import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
<li className="my-2 flex items-center justify-between gap-6 px-3 py-2 font-mono">
      <div className="flex grow items-start justify-between">
        <p className="">
          {quantity}&times; {name}
          <span className="block text-sm font-mono italic">{isLoadingIngredients ? "is loading..." :ingredients.join(',')}</span>
        </p>
        <div>
          <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
