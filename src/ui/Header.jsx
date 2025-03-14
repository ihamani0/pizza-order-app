import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/username";

function Header() {
  return (
    <header className="bg-primary border-secondary flex items-center justify-between border-l-4 px-4 py-3 text-white min-h-25">
      <Link to='/' className="">
      <h3 className="text-secondary-2  text-3xl font-bold tracking-wide uppercase md:text-5xl ">
        SNAKEY
      </h3>
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
