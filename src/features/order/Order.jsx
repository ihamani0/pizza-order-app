// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);


  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="my-5 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="font-mono text-2xl font-bold">Order #{id}</h2>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono font-semibold">Status : </span>
          {priority && (
            <span className="mx-2 rounded bg-red-400 px-1 font-mono text-xs font-semibold text-white ring-1 ring-red-500 ring-offset-2 sm:px-2 sm:py-0.5 sm:text-sm">
              Priority
            </span>
          )}
          <span className="text-third rounded bg-green-400 px-1 font-mono text-xs font-semibold ring-1 ring-green-500 ring-offset-2 sm:px-2 sm:py-0.5 sm:text-sm">
            {status} order
          </span>
        </div>
      </div>

      <div className="my-3 flex items-center justify-between rounded bg-stone-200 px-4 py-5 font-mono">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-700">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul>
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              Array.isArray(fetcher?.data) 
                ? fetcher.data.find((ingredient) => ingredient.id === item.pizzaId)?.ingredients 
                : []
            }
          />
        ))}
      </ul>
      <div className="my-3 space-y-3 rounded bg-stone-200 p-7 font-mono">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order;
};
export default Order;
