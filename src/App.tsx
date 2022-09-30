import "./App.css";
import { ContextMenu } from "./components/context-menu";
import reactIcon from "./assets/react.svg";
import { MenuList } from "./components/context-menu/types";
import { useEffect, useRef } from "react";

const menuList: MenuList[] = [
  {
    name: "Copy",
    hotKey: {
      key: ["ctrl", "c"],
      description: "Ctrl + C",
    },
  },
  {
    name: "Refresh",
    hotKey: {
      key: ["f5"],
      description: "F5",
    },
  },
  {
    name: "React",
    frontIcon: <img src={reactIcon} />,
  },
];

function App() {
  const ref = useRef(null);

  return (
    <div className="App" ref={ref}>
      <ContextMenu menuList={menuList} container={ref}/>
    </div>
  );
}

export default App;
