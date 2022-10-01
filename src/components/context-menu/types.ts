export interface Menu {
  /** Name of menu item. */
  name?: string;

  /** Description the menu, such as `hotkey`. */
  description?: JSX.Element | string;

  /** The Icon in front of `name` */
  frontIcon?: JSX.Element;

  /** Click hook.
   *
   * **param:** info -> `clicked item`
   *
   * **param:** target ->  pointer(`[number, number]`) | undefined(hot key case)
   */
  onClick?: (info: Menu, target?: [number, number]) => void;
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

  /** Close hook, when clicking `blank` or `menu item` */
  onClose?: () => void;

  /** Open hook.
   *
   * **param:** target ->  pointer(`[number, number]`)
   */
  onOpen?: (target: [number, number]) => void;
}
