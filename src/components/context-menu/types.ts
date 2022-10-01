export interface HotKey {
  /** Hot key is a string array. 
   * 
   * **info:** If you dont pass this prop, it will not register hot key. 
  */
  key: string[];

  /** Show on the menu */
  description?: JSX.Element | string;
}

export interface Menu {
  /** Name of menu item. */
  name?: string;

  /** Show hot key and register it. */
  hotKey?: HotKey;

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

  /** Close hook.
   *
   * **param:** info -> `clicked item | null(when clicking blank)`
   */
  onClose?: (info?: Menu) => void;

  /** Open hook.
   *
   * **param:** target ->  pointer(`[number, number]`)
   */
  onOpen?: (target: [number, number]) => void;
}
