import "./index.css";
import hotkeys from "hotkeys-js";
import { ContextMenuProps, Menu } from "./types";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export const ContextMenu = (props: ContextMenuProps) => {
  const { menuList = [], container, onOpen, onClose } = props;

  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<[number, number]>();
  // menu is unvisiable.
  const [style, setStyle] = useState<React.CSSProperties>({ display: "none" });

  const onClick = (info?: Menu) => {
    setStyle({ display: "none" });
    // effect: up data stream
    if (onClose) onClose(info);
  };

  useEffect(() => {
    if (container && container.current) {
      // add click listener
      container.current.onclick = () => onClick();

      // add contextmenu listener
      container.current.oncontextmenu = (event) => {
        event.preventDefault();

        // relative position
        const x = event.offsetX;
        const y = event.offsetY;

        // make a computable menu, set offset and make it hidden
        setStyle({
          display: "block",
          top: -10000,
          left: -10000,
        });

        // set click position, pass to show effect
        setPosition([x, y]);

        // effect: up data stream
        if (onOpen) onOpen([x, y]);
      };
    }
  }, [container]);

  useEffect(() => {
    // show menu function
    if (position && ref && ref.current && container && container.current) {
      // todo: may refactor this part
      const menuRef = ref.current;
      const menuPosition = position;
      const containerRef = container.current;

      // Bounds Check
      if (menuRef.offsetWidth + position[0] > containerRef.clientWidth)
        menuPosition[0] = containerRef.clientWidth - menuRef.offsetWidth;
      if (position[1] + menuRef.offsetHeight > containerRef.clientHeight)
        menuPosition[1] = containerRef.clientHeight - menuRef.offsetHeight;

      // make menu really visiable
      setStyle({
        display: "block",
        top: menuPosition[1],
        left: menuPosition[0],
      });
    }
  }, [position]);

  useEffect(() => {
    menuList.forEach((v) => {
      hotkeys(v?.hotKey?.key?.reduce((p, c) => p + "+" + c) ?? "", () => {
        if (v.onClick) v.onClick(v);
      });
    });
  }, [menuList]);

  const MenuList = useMemo(() => {
    // todo: refactor this part
    return (
      <ul className="ez-context-menu-ul">
        {menuList.map((v) => {
          return (
            <li
              className="ez-context-menu-li"
              onClick={() => {
                if (v.onClick) v.onClick(v, position);
                onClick(v);
              }}
              key={v.name}
            >
              <span className="ez-context-menu-li-name">
                {v.frontIcon && (
                  <div className="ez-context-menu-li-front-icon">
                    {v.frontIcon}
                  </div>
                )}
                {v.name}
              </span>
              <span className="ez-context-menu-li-hotkey">
                {v?.hotKey?.description ?? ""}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }, [menuList]);

  return (
    <div
      style={style}
      className="ez-context-menu"
      ref={ref as RefObject<HTMLDivElement>}
    >
      {MenuList}
    </div>
  );
};
