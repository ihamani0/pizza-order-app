import { Link } from "react-router-dom";

function Button({
  children,
  type = "button",
  style = "primary",
  onClick,
  disabled,
  to,
  classStyle = "",
}) {
  const baseStyle = `rounded-md font-semibold transition-all duration-150 cursor-pointer ${classStyle}`;

  const variants = {
    primary:
      "bg-secondary text-third border-third active:bg-primary border-2 tracking-wide active:text-white ",
    secondary:
      "bg-primary border-third active:bg-secondary border-2 tracking-wide text-white active:text-white ",
    danger: "opacity-80 bg-stone-500 text-white hover:bg-stone-600 ",
    outline: "",
  };

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${variants[style]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyle} ${variants[style]} ${disabled ? "disabled:cursor-not-allowed disabled:opacity-50" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
