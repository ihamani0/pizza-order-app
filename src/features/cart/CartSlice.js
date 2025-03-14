import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incresQuntity(state, action) {
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (pizzaItem) {
        pizzaItem.quantity++;
        pizzaItem.totalPrice = pizzaItem.unitPrice * pizzaItem.quantity;
      }
    },
    decresQuntity(state, action) {
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (pizzaItem) {
        pizzaItem.quantity--;
        pizzaItem.totalPrice = pizzaItem.unitPrice * pizzaItem.quantity;
        if (pizzaItem.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, incresQuntity, decresQuntity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

//reusable select function
//seacrch on this : // Memoized selector to calculate total items in the cart

//getters like in vue js

export const getCart = (state) => state.Cart.cart;

export const getTotaleQuantity = (state) => {
  return state.Cart.cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
};

export const getTotalePrice = (state) => {
  return state.Cart.cart.reduce(function (sum, item) {
    return sum + item.totalPrice;
  }, 0);
};

export const checkPizzaInMenu = (id) => {
  return function (state) {
    return (
      state.Cart.cart.find((item) => item.pizzaId === id)?.quantity ?? null
    );
  };
};
