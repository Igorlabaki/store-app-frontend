import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<any> {
  title?: string;
  className?: string;
  icon?: ReactNode;
  titleClassname?: string;
}

export function ButtonComponent({
  title,
  className,
  icon,
  titleClassname,
  ...rest
}: Props) {
  return (
    <button {...rest} className={className} type="button">
      {icon ? icon : null}
      <p className={titleClassname}>{title}</p>
    </button>
  );
}
