import { Form, redirect, useActionData, useRouteError } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/CartSlice";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { username, address, error, isloading, position } = useSelector(
    (state) => state.User,
  );

  const errors = useActionData(); // Get errors from action
  const errorElement = useRouteError();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  function handleGetLocation(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className="my-5 space-y-3 px-4 py-3 md:w-3/4">
      <h2 className="text-primary text-xl font-semibold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST" className="space-y-5 font-mono">
        <div className="flex-start gap-3">
          <label className="min-w-32">First Name</label>
          <input
            type="text"
            name="customer"
            className="input flex-1 rounded"
            defaultValue={username}
            required
            autoComplete="off"
          />
        </div>

        <div className="flex-start gap-3">
          <label className="w-32">Phone number</label>
          <div className="flex-1 rounded">
            <input
              type="tel"
              name="phone"
              className="input w-full rounded"
              required
            />
            {errors?.phone && <p className="prompt-error">{errors.phone}</p>}
          </div>
        </div>

        <div className="flex-start relative gap-3">
          <label className="w-32">Address</label>
          <div className="flex-1 rounded">
            <input
              type="text"
              name="address"
              className="input w-full"
              required
              autoComplete="off"
              defaultValue={address}
              disabled={isloading}
            />
          </div>
          <Button
            classStyle="absolute px-1 top-1 right-1 "
            onClick={handleGetLocation}
          >
            📍
          </Button>
        </div>

        <div className="space-x-1">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="accent-primary"

            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm">
            Want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={`${position.latitude ?? 0},${position.longitude ?? 0}`}
        />

        <div className="my-3 text-center">
          {error && <p className="prompt-error">{error}</p>}
        </div>
        <div className="my-3 text-center">
          {errors?.cart && <p className="prompt-error">{errors.phone}</p>}
          {errorElement && <p className="prompt-error">{errorElement.message}</p> }
        </div>
        <div className="flex items-center justify-end">
          <Button classStyle="py-2 px-3" type="submit"> 
            Order now
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  const errors = {};

  //check the cart is empty rtuen
  if (!data.cart.length) {
    errors.cart = "Please check the cart and try again"; // Standard key name
  }

  //validation the input feild
  if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number"; // Standard key name
  }

  if (Object.keys(errors).length > 0) {
    return errors; // Return plain errors object
  }

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  //call api method to create order
  const newOrder = await createOrder(order);

  //import store her to dispatch clearCart function direct because we can not call hook in pure function
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
