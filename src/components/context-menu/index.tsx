import { createRef, LegacyRef, useEffect, useRef, useState } from "react";
import "./index.css";
import { ContextMenuProps } from "./types";

export const ContextMenu = (props: ContextMenuProps) => {
  const { menuList, container } = props;
  const ref = useRef(null);

  const [position, setPosition] = useState<[number, number]>();
  const [style, setStyle] = useState<React.CSSProperties>({
    display: "none",
  });

  const onClick = () => {
    setStyle({ display: "none" });
  };

  const MenuList = () => {
    return (
      <ul className="ez-context-menu-ul">
        {menuList?.map((v) => (
          <li className="ez-context-menu-li" onClick={onClick} key={v.name}>
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
        ))}
      </ul>
    );
  };

  useEffect(() => {
    if (container && container.current) {
      container.current.onclick = onClick;
      container.current.oncontextmenu = (event) => {
        event.preventDefault();

        const x = event.clientX;
        const y = event.clientY;

        setStyle({
          display: "block",
          top: -10000,
          left: -10000,
        });
        setPosition([x, y]);
      };
    }
  }, [container]);

  useEffect(() => {
    if (position) {
      console.log(container?.current.clientHeight);
      if (
        ref.current.offsetWidth + position[0] >
        container?.current.clientWidth
      ) {
        position[0] = container?.current.clientWidth - ref.current.offsetWidth - 3;
      }
      if (
        position[1] >
        container?.current.clientHeight
      ) {
        position[1] = container?.current.clientHeight - 3;
      }

      setStyle({
        display: "block",
        top: position[1],
        left: position[0],
      });
    }
  }, [position]);

  const onClickContext: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="ez-context-menu"
      style={style}
      onClick={onClickContext}
      ref={ref}
    >
      <MenuList />
    </div>
  );
};
