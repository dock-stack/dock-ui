import classes from "./index.module.css";
import { ContextMenuProps } from "./types";
import { css } from "@emotion/react";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

/** todo: css in  */
export const ContextMenu = (props: ContextMenuProps) => {
  const { menuList = [], container, onOpen, onClose } = props;

  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<[number, number]>();
  const [style, setStyle] = useState<React.CSSProperties>({ display: "none" }); // menu is unvisiable initially.

  const onMenuClose = () => {
    if (onClose) onClose();

    setStyle({ display: "none" });
  };

  useEffect(() => {
    if (container && container.current) {
      // add click listener
      container.current.addEventListener("click", onMenuClose);

      // add contextmenu listener
      container.current.oncontextmenu = (event) => {
        event.preventDefault();

        // relative position
        const x = event.offsetX;
        const y = event.offsetY;

        // make a computable menu, set offset and make it hidden
        setStyle({
          top: -10000,
          left: -10000,
          display: "block",
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

  const MenuList = useMemo(() => {
    // todo: refactor this part
    return (
      <ul className={classes.ezContextMenuUl} css={css``}>
        {menuList.map((v) => {
          return (
            <li
              key={v.name}
              className="ez-context-menu-li"
              onClick={() => {
                if (v.onClick) v.onClick(v, position);
              }}
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
                {v?.description ?? ""}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }, [menuList, position]);

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
