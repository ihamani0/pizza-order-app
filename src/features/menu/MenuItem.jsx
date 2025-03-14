import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import DeleteButton from "../../ui/DeleteButton";
import { formatCurrency } from "../../utils/helpers";
import { addItem, checkPizzaInMenu } from "../cart/CartSlice";
import QuantityButton from "../../ui/QuantityButton";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(checkPizzaInMenu(id));

  const handleAddToCart = () => {
    let newItem = {
      pizzaId: id, // Ensure consistency
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
      quantity: 1, // Fix spelling
    };
    dispatch(addItem(newItem));
  };
  return (
    <li className="my-1 flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-4">
        <img
          src={imageUrl}
          alt={name}
          className={`my-1 h-25 w-25 rounded-lg ${soldOut ? "opacity-50" : ""}`}
        />
        <div className="flex h-24 flex-col">
          <div>
            <p className="inline-block font-mono text-lg font-semibold tracking-wide">
              {name}
            </p>
            <p className="font-mono text-sm tracking-wide italic">
              {ingredients.join(", ")}
            </p>
          </div>

          <div className="mt-auto">
            {!soldOut ? (
              <p className="text-sm font-bold">{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="border-secondary-2 bg-secondary inline-flex rounded-xs border px-2 text-xs font-semibold">
                Sold out
              </p>
            )}
          </div>
        </div>
      </div>

      {currentQuantity && (
        <div className="flex-center gap-3 sm:gap-8">
          <QuantityButton pizzaId={id} currentQuantity={currentQuantity} />
          <DeleteButton pizzaId={id} />
        </div>
      )}

      {!soldOut && !currentQuantity && (
        <Button
          classStyle="p-2 min-w-28"
          style="secondary"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
