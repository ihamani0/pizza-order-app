/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./CartSlice";
import EmptyCart from "./EmptyCart";


function Cart() {

  const username = useSelector((state) => state.User.username);

  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  function handleClearCart(){
    dispatch(clearCart());
  }

  if(!cart.length) return <EmptyCart />

  return (
    <div className="my-5 space-y-5 px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-9 font-bold sm:text-lg md:text-xl ">
        Your cart, <span className=" uppercase fonto-mono font-semibold text-primary">{username}</span>
      </h2>

      <ul className="divide-primary border-primary divide-y border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="space-x-2">
        <Button to="/order/new" classStyle="px-3 py-2 min-w-32">
          Order pizzas
        </Button>
        <Button style="danger" classStyle="px-1 py-2 min-w-32" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
