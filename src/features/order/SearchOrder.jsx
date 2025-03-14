import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search Order # "
          className=" bg-stone-200 min-w-70 placeholder:font-mono border text-stone-500  py-2 pl-8 rounded-full focus:outline-none duration-100 transition-all ease-in   focus:border-secondary "
        />

    </form>
  );
}

export default SearchOrder;
