import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<any> {
  state: string;
  setState: any;
  lable?: string;
  icon?: ReactNode;
  divClassName?: string;
  inputClassName?: string;
  titleClassname?: string;
}

export function InputComponent({
  lable,
  icon,
  state,
  setState,
  divClassName,
  inputClassName,
  titleClassname,
  ...rest
}: Props) {
  return (
    <div className={`flex flex-col animate-openMenu`}>
      <p className={`text-sm text-gray-800 font`}>{lable}:</p>
      <input
        {...rest}
        className={`bg-transparent outline-none bg-blue-50 rounded-md py-1 px-3`}
        value={state}
      />
    </div>
  );
}
