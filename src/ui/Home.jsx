import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.User.username);
  return (
    <div className="my-10 space-y-4 text-center">
      <h1 className="text-third text-center text-sm font-semibold uppercase md:text-2xl">
        The best pizza.
        <br />
        <span className="text-secondary-2 md:text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="menu" classStyle="py-2 px-3 ">
          Go ! To Menu {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
