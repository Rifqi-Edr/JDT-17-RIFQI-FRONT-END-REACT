import React from "react";

interface IButtonComponent {
  content: string;
  desc?: string;
  onClick : React.MouseEventHandler<HTMLButtonElement>
} 

const Button = (props: IButtonComponent) => {
  return <button className="" onClick={props.onClick}>{props.content}</button>;
};

export default Button;