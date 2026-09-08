<!--GITHUB_BLOCK-->

# Popover

<!--/GITHUB_BLOCK-->

`Popover` shows floating, optionally interactive content (text, links, or buttons) anchored to a child element and opened on hover or click. It wraps [`Popup`](../Popup/README.md) with built-in trigger interactivity, using the `ReactElement` passed via the `children` property as the trigger.

```tsx
import {Popover} from '@gravity-ui/uikit';
```

## Usage

Wrap HTML element or any component that accepts native DOM handlers and ARIA attributes in properties (i.e. `Button`) with `Popover` component. Put your content
into `content` property.

```jsx
import {Button, Popover} from '@gravity-ui/uikit';

<Popover content="Content">
  <Button>Click or hover me</Button>
</Popover>;
```

## Properties

| Name                 | Description                                                                                                   |                                Type                                 |     Default     |
| :------------------- | :------------------------------------------------------------------------------------------------------------ | :-----------------------------------------------------------------: | :-------------: |
| children             | `ReactNode` which accepts DOM handlers                                                                        |                          `React.ReactNode`                          |                 |
| className            | HTML `class` attribute for root node                                                                          |                              `string`                               |                 |
| container            | DOM element to which component is mounted via `Portal`                                                        |                            `HTMLElement`                            | `document.body` |
| content              | Any content to render inside the `Popover`                                                                    |                          `React.ReactNode`                          |                 |
| contentClassName     | HTML `class` attribute for content node                                                                       |                              `string`                               |                 |
| delay                | Wait specified time in milliseconds before changing `open` state                                              |             `number` `{open?: number; close?: number}`              |                 |
| disableEscapeKeyDown | Do not dismiss on `Esc` keydown                                                                               |                              `boolean`                              |     `false`     |
| disableLayer         | Do not use `LayerManager` on stacking floating elements                                                       |                              `boolean`                              |     `false`     |
| disableOutsideClick  | Do not dismiss on outside click                                                                               |                              `boolean`                              |     `false`     |
| disablePortal        | Disables using `Portal`                                                                                       |                              `boolean`                              |     `false`     |
| disabled             | Do not open on any event                                                                                      |                              `boolean`                              |     `false`     |
| enableSafePolygon    | Use dynamic polygon area when moving the pointer from trigger to `Popover` content to prevent it from closing |                              `boolean`                              |     `false`     |
| hasArrow             | Render an arrow pointing to the trigger                                                                       |                              `boolean`                              |     `false`     |
| keepMounted          | `Popover` will not be removed from the DOM upon hiding                                                        |                              `boolean`                              |     `false`     |
| middlewares          | `Floating UI` middlewares. If set, they will completely overwrite the default middlewares.                    |                         `Array<Middleware>`                         |                 |
| modal                | Enables focus trapping behaviour                                                                              |                              `boolean`                              |     `false`     |
| offset               | `Floating UI` offset value                                                                                    |                           `PopoverOffset`                           |       `4`       |
| onOpenChange         | Function that is called when the `open` state changes                                                         |                             `Function`                              |                 |
| open                 | Manually control the `open` state                                                                             |                              `boolean`                              |                 |
| placement            | `Floating UI` placement                                                                                       | `Placement` `Array<Placement>` `"auto"` `"auto-start"` `"auto-end"` |     `"top"`     |
| qa                   | Test attribute (`data-qa`)                                                                                    |                              `string`                               |                 |
| rest                 | How much time in ms the cursor must be rest before open.                                                      |                              `number`                               |       `0`       |
| strategy             | `Floating UI` positioning strategy                                                                            |                       `"absolute"` `"fixed"`                        |  `"absolute"`   |
| style                | HTML `style` attribute for root node                                                                          |                              `string`                               |                 |
| toggle               | Whether to toggle the `open` state with repeated clicks                                                       |                              `boolean`                              |     `true`      |
| trigger              | Which event should open the `Popover`. Default `all` value refers to both `hover` and `click`                 |                          `"all"` `"click"`                          |     `"all"`     |
