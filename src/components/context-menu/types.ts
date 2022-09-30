export interface HotKey {
  description?: string;
  key: string[];
}

export interface MenuList {
  name?: string;
  hotKey?: HotKey;
  frontIcon?: JSX.Element;
}

export interface ContextMenuProps {
  menuList?: MenuList[];
  container?: React.MutableRefObject<null>;
}
