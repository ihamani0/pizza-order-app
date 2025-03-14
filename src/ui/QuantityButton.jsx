import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { decresQuntity, incresQuntity } from "../features/cart/CartSlice";

function QuantityButton({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="mx-2 flex items-center justify-center gap-3">
      <Button
        classStyle="px-2 py-1"
        onClick={() => dispatch(incresQuntity(pizzaId))}
      >
        +
      </Button>
      <span className="font-semibold font-mono">{currentQuantity}</span>
      <Button
        classStyle="px-2 py-1"
        onClick={() => dispatch(decresQuntity(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}

export default QuantityButton;
