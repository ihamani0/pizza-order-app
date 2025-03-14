import React from "react";
import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.User.username);

  if (!username) return null;
  return (
    <p className="text-xl font-mono font-semibold tracking-wide">
      Hello {username}
    </p>
  );
}

export default UserName;
