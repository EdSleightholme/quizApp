interface IProps {
  variant?: "default" | "destructive" | "outline";
  children?: React.ReactNode;
  onClick?: (event: Event) => void;
  disabled?: boolean;
  submit?: boolean;
  inactive?: boolean;
}

export const Button = ({
  variant,
  children,
  onClick,
  disabled,
  submit,
}: IProps) => {
  let buttonStyle = "";
  switch (variant || "default") {
    case "default":
      buttonStyle =
        " w-full cursor-pointer  rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300";
      break;
    case "destructive":
      buttonStyle =
        "w-full cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  ";
      break;
    case "outline":
      buttonStyle =
        "w-full cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  ";
      break;
    default:
      break;
  }
  variant;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={submit ? "submit" : "button"}
      className={buttonStyle}
    >
      {children}
    </button>
  );
};
