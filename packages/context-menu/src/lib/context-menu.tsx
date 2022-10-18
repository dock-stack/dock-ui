import { css } from "@emotion/react";
import { ContextMenuProps } from "./types";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export const ContextMenu = (props: ContextMenuProps) => {
    const ref = useRef<HTMLElement>(null);
    const { menuList = [], container, onOpen, onClose } = props;

    const [position, setPosition] = useState<[number, number]>();
    const [style, setStyle] = useState<React.CSSProperties>({
        display: "none",
    }); // menu is unvisiable initially.

    const onMenuClose = (e: MouseEvent) => {
        if (style.display !== "none") {
            // only in container
            if (e.target == container?.current) {
                setStyle({ ...style, display: "none" });
                onClose?.();
            }
        }
    };

    // useLayoutEffect maybe...
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

                // effect: up data stream
                if (onOpen) onOpen([x, y]);

                // make a computable menu, set offset and make it hidden
                setStyle({
                    top: -10000,
                    left: -10000,
                    display: "block",
                });

                // set click position, pass to show effect
                setPosition([x, y]);
            };
        }

        return () => {
            if (container && container.current) {
                container.current.oncontextmenu = null;
                container?.current?.removeEventListener("click", onMenuClose);
            }
        };
    }, [container, style]);

    useEffect(() => {
        // show menu function
        if (position && ref && ref.current && container && container.current) {
            // todo: may refactor this part
            const menuRef = ref.current;
            const menuPosition = position;
            const containerRef = container.current;

            // Bounds Check
            if (menuRef.offsetWidth + position[0] > containerRef.clientWidth)
                menuPosition[0] =
                    containerRef.clientWidth - menuRef.offsetWidth;
            if (position[1] + menuRef.offsetHeight > containerRef.clientHeight)
                menuPosition[1] =
                    containerRef.clientHeight - menuRef.offsetHeight;

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
            <ul
                css={css`
                    list-style: none;
                    padding: 0;
                    margin: 5px 0;
                `}
                onClick={() => {}}
            >
                {menuList.map((v) => {
                    return v.render ? (
                        <li
                            key={v.name}
                            onClick={() => {
                                if (!v.disabled) {
                                    v.onClick?.(v, position);
                                    onClose?.(v);
                                    setStyle({ display: "none" });
                                }
                            }}
                        >
                            {v.render(v, position ?? [0, 0])}
                        </li>
                    ) : (
                        <li
                            key={v.name}
                            css={css`
                                padding: 3px 14px;
                                cursor: pointer;
                                pointer-events: ${v.disabled ? "none" : "auto"};
                                color: ${v.disabled
                                    ? "rgb(198, 198, 198)"
                                    : "auto"};
                                user-select: none;
                                display: flex;
                                justify-content: space-between;
                                &:hover {
                                    background-color: rgb(178 178 178 / 20%);
                                }
                            `}
                            onClick={() => {
                                if (!v.disabled) {
                                    v.onClick?.(v, position);
                                    onClose?.(v);
                                    setStyle({ display: "none" });
                                }
                            }}
                        >
                            <span>
                                {v.frontIcon && (
                                    <div
                                        css={css`
                                            width: 17px;
                                            height: 14px;
                                            display: inline-flex;
                                            position: relative;
                                            top: 1px;
                                        `}
                                    >
                                        {v.frontIcon}
                                    </div>
                                )}
                                {v.name}
                            </span>
                            <span
                                css={css`
                                    font-size: 0.6em;
                                    color: rgb(198, 198, 198);
                                    position: relative;
                                    top: 9px;
                                `}
                            >
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
            css={css`
                position: absolute;
                border-radius: 8px;
                box-shadow: 0 1px 2px rgb(60 64 67 / 30%),
                    0 1px 3px 1px rgb(60 64 67 / 15%);
                min-width: 200px;
                background-color: white;
            `}
            ref={ref as RefObject<HTMLDivElement>}
        >
            {MenuList}
        </div>
    );
};
