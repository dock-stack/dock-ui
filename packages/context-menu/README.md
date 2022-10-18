# @dock-ui/context-menu

## Base Style

Using `ContextMenu` component, you can make a context menu to replace original menu, and bind event on it.

![RUNOOB 图标](../../public/context-menu.gif)

#### Example Code

<details>
<summary>React width TS</summary>

```tsx
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
            <ContextMenu menuList={menuList} container={ref} />
        </div>
    );
}
```

</details>