import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Button from "./components/button";
import Box from "./components/box";

function App() {
  const [count, setCount] = useState(0);

  const addingCount = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    console.log("pertama kali di render");
    return () => {};
  }, []);

  useEffect(() => {
    console.log("ke trigger kalo count berubah");
  }, [count]);

  const Experience = [
    {
      title: "PT Indivara Group",
      desc: "Frontend Developer yang mengerjakan 3 Aplikasi Wealth Management System",
    },
    {
      title: "PT Suka Group",
      desc: "Backend Developer yang mengerjakan 3 Aplikasi Distribution Management System",
    },
  ];

  return (
    <>
    <div className="flex flex-row gap-4">
      {Experience.map((el, index) => {
        return <Box title={el.title} desc={el.desc} />;
      })}
    </div>
    </>
  );
}

export default App;
