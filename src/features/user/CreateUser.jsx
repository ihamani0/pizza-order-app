import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUser(username));
    navigate("/menu");
  }

  return (
    <div className="flex-center">
      <form onSubmit={handleSubmit}>
        <p>👋 Welcome! Please start by telling us your name:</p>

        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input focus:border-primary focus:ring-primary my-5 w-full rounded-lg"
        />

        {username !== "" && (
          <div>
            <Button classStyle="px-3 py-2 min-w-32" type="submit">Start Ordering</Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateUser;
