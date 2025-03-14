import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to, style = "primary" }) {
  const navigate = useNavigate();

  const baseStyles ="font-semibold cursor-pointer px-2 py-1 transition-all duration-200";
  const variants = {
    primary: "text-primary hover:text-primary-dark",
    secondary: "text-gray-500 hover:text-gray-700",
    danger: "text-red-500 hover:text-red-700",
  };

  if (to === "-1")
    return (
      <button
        onClick={() => navigate(-1)}
        className={`${baseStyles} ${variants[style]}`}
      >
        {children}
      </button>
    );

  return (
    <Link to={to} className={`${baseStyles} ${variants[style]}`}>
      {children}
    </Link>
  );
}

export default LinkButton;
