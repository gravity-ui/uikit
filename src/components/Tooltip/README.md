<!--GITHUB_BLOCK-->

# Tooltip

<!--/GITHUB_BLOCK-->

A simple text tip that uses its child node as an anchor. This component accepts only text content and may be an excellent
alternative to the browser's `title` attribute with its small size and long appearance delay.

## Usage

```tsx
import {Tooltip} from '@gravity-ui/uikit';

<Tooltip content="Content">
  <div tabIndex={0}>Anchor</div>
</Tooltip>;
```

## Anchor

In order for `Tooltip` to work you should pass a valid `ReactElement` as a children which accepts `ref` property for `HTMLElement`
and other properties for `HTMLElement`.

Alternatively, you can pass function as a children to provide ref and props manually to your underlying components:

```tsx
import {Tooltip} from '@gravity-ui/uikit';

<Tooltip content="Content">
  {(props, ref) => <MyCustomButton buttonProps={props} buttonRef={ref} />}
</Tooltip>;
```

## Controlled State

By default `Tooltip` opens and hides by hovering the anchor. You can change this behaviour to manually set the open state.
Pass your state to the `open` prop and change it from `onOpenChange` callback.
`onOpenChange` callback has the following signature: `(open: boolean, event?: Event, reason: 'hover' | 'focus') => void`.

## Role

`Tooltip` accepts the `role` property which changes how it should act it terms of accessibility.
`tooltip` role should be used when anchor has its own text and `label` role otherwise (e.g. in icon button).

## Properties

| Name          | Description                                                                 |                       Type                       |     Default     |
| :------------ | --------------------------------------------------------------------------- | :----------------------------------------------: | :-------------: |
| children      | Anchor element for the `Tooltip`                                            |         `React.ReactElement` `Function`          |                 |
| className     | `class` HTML attribute                                                      |                     `string`                     |                 |
| closeDelay    | Number of ms to delay hiding the `Tooltip` after the hover ends             |                     `number`                     |       `0`       |
| container     | DOM element to which component is mounted via `Portal`                      |                  `HTMLElement`                   | `document.body` |
| content       | Content that will be shown in the `Tooltip`                                 |                `React.ReactNode`                 |                 |
| disabled      | Prevent the `Tooltip` from opening                                          |                    `boolean`                     |                 |
| disablePortal | Disables using `Portal`                                                     |                    `boolean`                     |     `false`     |
| offset        | `Tooltip` offset from its anchor                                            |                     `number`                     |       `4`       |
| onOpenChange  | Callback to handle open state change                                        |                    `Function`                    |                 |
| open          | Controlled open state                                                       |                    `boolean`                     |                 |
| openDelay     | Number of ms to delay showing the `Tooltip` after the hover begins          |                     `number`                     |     `1000`      |
| placement     | `Tooltip` position relative to its anchor                                   | [`PopupPlacement`](../Popup/README.md#placement) |    `bottom`     |
| qa            | `data-qa` HTML attribute, used for testing                                  |                     `string`                     |                 |
| role          | The role `Tooltip` is used for                                              |              `"tooltip"` `"label"`               |   `"tooltip"`   |
| strategy      | The type of CSS position property to use.                                   |                `absolute` `fixed`                |   `absolute`    |
| style         | `style` HTML attribute                                                      |              `React.CSSProperties`               |                 |
| trigger       | Event type that should trigger opening. By default both hover and focus do. |                    `"focus"`                     |                 |

## CSS API

| Name                           | Description      |
| :----------------------------- | :--------------- |
| `--g-tooltip-text-color`       | Text color       |
| `--g-tooltip-background-color` | Background color |
| `--g-tooltip-padding`          | Padding          |
| `--g-tooltip-border-radius`    | Border radius    |
| `--g-tooltip-box-shadow`       | Shadow           |
