import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/CartSlice";

function DeleteButton({ pizzaId }) {
  const disptach = useDispatch();

  return (
    <Button
      classStyle="px-2 py-1 min-w-20"
      onClick={() => disptach(deleteItem(pizzaId))}
    >
      delete
    </Button>
  );
}

export default DeleteButton;
