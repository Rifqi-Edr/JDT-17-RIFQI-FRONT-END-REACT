import React from "react";

const Index = ({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) => {
  return (
    <div
      className={`w-72 h-72 ${index % 2 == 0 ? "bg-blue-800" : "bg-blue-100"} text-black rounded-lg flex flex-col`}
    >
      <div className="">
        <h4>{title}</h4>
      </div>
      <hr className="w-5 self-center" />
      <div className="">
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default Index;
