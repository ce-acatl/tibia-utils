import React from "react";
import "./App.scss";
import Chronometer from "./components/Chronometer/Chronometer";
import Inbuiments from "./components/Imbuiments/Imbuiments";
import QuestItems from "./components/QuestItems/QuestItems";

function App() {
  const chronos = [
    {
      title: "Chronometer 1",
      image: "https://picsum.photos/50/50",
      time: "00:09:00",
      mp3: "./alarms/1.mp3",
    },
    {
      title: "Plasma collar",
      image: "https://picsum.photos/50/50",
      time: "00:29:00",
      mp3: "./alarms/2.mp3",
    },
    {
      title: "Food",
      image: "https://picsum.photos/50/50",
      time: "00:59:00",
      mp3: "./alarms/1.mp3",
    },
  ];
  const links = [
    ["dashboard", "Dashboard"],
    ["chronometers", "Chronometers"],
    ["inbuiments", "Inbuiments"],
    ["questItems", "Quest Items"],
  ];
  const [currentScreen, setCurrentScreen] = React.useState(links[0]);
  const handleClick = (screen: string[]) => {
    return () => {
      setCurrentScreen(screen);
    };
  };
  console.log(chronos, 1111);
  return (
    <div className="App">
      <h1>{currentScreen[1]}</h1>
      {links.map((link) => (
        <button onClick={handleClick(link)} key={link[0]}>
          {link[1]}
        </button>
      ))}
      {currentScreen[0] === "chronometers" &&
        chronos.map((chrono: any, i) => {
          return <Chronometer key={`chrono-${i}`} {...chrono} />;
        })}
      {currentScreen[0] === "inbuiments" && <Inbuiments />}
      {currentScreen[0] === "questItems" && <QuestItems />}
    </div>
  );
}

export default App;
