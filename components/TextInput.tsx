interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: React.ReactNode;
  helpText?: string;
  password?: boolean;
  disabled?: boolean;
  name: string;
  error?: boolean;
  number?: boolean;
}

export const TextInput = ({
  value,
  onChange,
  placeholder,
  label,
  password,
  disabled,
  name,
  helpText,
  error,
  number,
}: IProps) => (
  <div className="py-2">
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-gray-900 ">
        {label}
      </label>
    )}
    <input
      name={name}
      disabled={disabled}
      type={number ? "number" : password ? "password" : "text"}
      id={name}
      /*BUG  something weird is going on with the import order as border-red is being added before border-slate 
      add fix so it would work as intended but in real world i would fix the bug. Probably something to do with config and vite
    //   className={`${
    //     error && " border-2 border-red-600 ring-red-500"
    //   } border-2 border-slate-300 block w-full rounded-lg   bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  `}
    */
      className={`${
        error
          ? " border-2 border-red-600 ring-red-500"
          : "border-2 border-slate-300"
      }  block w-full rounded-lg bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  `}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    {helpText && (
      <p className={`mt-2 text-sm ${error && "text-red-600"} `}>{helpText}</p>
    )}
  </div>
);
