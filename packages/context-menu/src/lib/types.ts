type Position = [number, number];

export interface Menu {
    /** Name of menu item. */
    name?: string;

    /** Description the menu, such as `hotkey`. */
    description?: JSX.Element | string;

    /** The Icon in front of `name` */
    frontIcon?: JSX.Element;

    /** Able to click. */
    disabled?: boolean;

    /**
     * render props: you can control what you want show as the list item.
     * you can control UI but not close event.
     */
    render?: (item: Menu, position: Position) => JSX.Element;

    /** Click hook.
     *
     * **param:** info -> `clicked item`
     *
     * **param:** target ->  pointer(`[number, number]`) | undefined(hot key case)
     */
    onClick?: (info: Menu, target: Position) => void;
}

export interface ContextMenuProps {
    /** Context menu list
     *
     *  **defalut:** []
     */
    menuList?: Menu[];

    /** The container of context menu
     *
     * **default:** `doucument.documentElement.`
     */
    container?: React.MutableRefObject<HTMLElement | null>;

    /**
     * Close hook, when clicking `blank` or `menu item`.
     * If item being `undefined`, it means click `black`.
     */
    onClose?: (item?: Menu) => void;

    /** Open hook.
     *
     * **param:** target ->  pointer(`[number, number]`)
     */
    onOpen?: (target: Position) => void;
}
