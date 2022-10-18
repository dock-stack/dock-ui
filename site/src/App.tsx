import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ContextMenu, { Menu } from "context-menu";

function App() {
    const ref = useRef<HTMLDivElement>(null);

    const menuList: Menu[] = [
        {
            name: "Copy",
            description: "Ctrl + C",
            onClick: () => {
                console.log("item");
            },
            render: (item, position) => {
                return <div>{item.name + position.toString()}</div>;
            },
        },
        {
            name: "Refresh",
            description: "F5",
        },
        {
            name: "React",
            description: "An FrameWork",
            frontIcon: <img src={reactLogo} />,
        },
        {
            name: "Disabled",
            description: "Alt + <-",
            disabled: true,
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
                backgroundColor: "rgb(161 208 234 / 50%)",
            }}
        >
            <ContextMenu
                menuList={menuList}
                container={ref}
                onOpen={() => {
                    console.log("open");
                }}
                onClose={() => {
                    console.log("close");
                }}
            />
        </div>
    );
}

export default App;
