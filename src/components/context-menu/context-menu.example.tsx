import { ContextMenu } from "./";
import { Menu } from "./types";
import { useRef } from "react";
import reactIcon from "../../assets/react.svg";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const menuList: Menu[] = [
    {
      name: "Copy",
      hotKey: {
        key: ["ctrl", "c"],
        description: "Ctrl + C",
      },
      onClick: (info, target) => {
        console.log(info, target);
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

  return (
    <div
      className="App"
      ref={ref}
      style={{
        width: "400px",
        height: "400px",
        position: "relative",
        top: "50px",
        left: "100px",
        backgroundColor: "rgb(161 208 234 / 50%)"
      }}
    >
      <ContextMenu
        menuList={menuList}
        container={ref}
        onOpen={(target) => {
          console.log(target);
        }}
        onClose={(info) => {
          console.log(info);
        }}
      />
    </div>
  );
}

export default App;
