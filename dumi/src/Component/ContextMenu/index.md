# ContextMenu

## baseStyle

```tsx
import React, { useRef } from 'react';
import ContextMenu, { Menu } from '@dock-ui/context-menu';

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const menuList: Menu[] = [
    {
      name: 'Custom item,position:',
      description: 'any thing',
      onClick: () => {
        console.log('item');
      },
      render: (item, position) => {
        return <div>{item.name + ' ' + position.toString()}</div>;
      },
    },
    {
      name: 'Refresh',
      description: 'F5',
    },
    {
      name: 'React',
      description: 'An FrameWork',
    },
    {
      name: 'Disabled',
      disabled: true,
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '200px',
        position: 'relative',
        backgroundColor: 'rgb(161 208 234 / 50%)',
      }}
    >
      <ContextMenu
        menuList={menuList}
        container={ref}
        onOpen={() => {
          console.log('open');
        }}
        onClose={() => {
          console.log('close');
        }}
      />
    </div>
  );
}

export default App;
```

## Props

### container

Ref linking to a DOM Element. Please make the container's position attr to `relative`.

### onOpen

A callback to subscribe `open menu event`. The Component will pass `position` to callback. <br> `(position: [number, number]) => void | undefined`

### onClose

A callback to subscribe `close menu event`. The Conponent may pass `target?: Menu` to callback. if target is undefined, that means click the black to close. <br> `(target?: Menu) => void | undefined`

### menuList

The `menuList` is an array with `Menu`, which has such props: <br> `Menu[]`

#### name

The `name prop` shows as a title, it is a **must**. Beside, it is the key of list, so making it unique as possible as you can and it seems that appearing same name menus is rare. <br> `string`

#### description

You can pass it to show something like `hotkey`, `infomation` and so on. it is optional. <br> `string | undefined`

#### frontIcon

The front icon will render like the gif showing. It will shrink the height as one line. it is optional. <br> `JSX.Element | undefined`

#### disabled

Default value is false, and clear it's all events. optional. <br> `boolean | undefined`

#### onClick

A callback that runs when click the item. `disabled` will block this event. The component will pass two props:

1. info: `Menu` the item clicked.
2. position: `[number, number]` the positon left-clicked.

`(info: Menu, position: Positon) => void | undefined`

#### render

A render prop, which you can pass your costum menu. <br> `(item: Menu, position: Positon) => JSX.Element | undefined`

#### example

```jsx | pure
const menuList: Menu[] = [
  {
    name: 'Copy',
    description: 'Ctrl + C',
    onClick: () => {
      console.log('item');
    },
    render: (item, position) => {
      return <div>{item.name + position.toString()}</div>;
    },
  },
  {
    name: 'Refresh',
    description: 'F5',
  },
  {
    name: 'React',
    description: 'An FrameWork',
    frontIcon: <img src={reactLogo} />,
  },
  {
    name: 'Disabled',
    disabled: true,
  },
];
```
