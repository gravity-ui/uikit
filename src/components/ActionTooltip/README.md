<!--GITHUB_BLOCK-->

# ActionTooltip

<!--/GITHUB_BLOCK-->

[`Tooltip`](../Tooltip/README.md) for labeling action buttons without descriptive text (e.g. icon buttons).

## Usage

```tsx
import {ActionTooltip} from '@gravity-ui/uikit';

<ActionTooltip title="Action">
  <div tabIndex={0}>Anchor</div>
</ActionTooltip>;
```

## Anchor

In order for `ActionTooltip` to work you should pass a valid `ReactElement` as a children which accepts `ref` property for `HTMLElement`
and other properties for `HTMLElement`.

Alternatively, you can pass function as a children to provide ref and props manually to your underlying components:

```tsx
import {ActionTooltip} from '@gravity-ui/uikit';

<ActionTooltip title="Action">
  {(props, ref) => <MyCustomButton buttonProps={props} buttonRef={ref} />}
</ActionTooltip>;
```

## Controlled State

By default `ActionTooltip` opens and hides by hovering the anchor. You can change this behaviour to manually set the open state.
Pass your state to the `open` prop and change it from `onOpenChange` callback.
`onOpenChange` callback has the following signature: `(open: boolean, event?: Event, reason: 'hover' | 'focus') => void`.

## Properties

| Name          | Description                                                                 |                       Type                       |     Default     |
| :------------ | --------------------------------------------------------------------------- | :----------------------------------------------: | :-------------: |
| children      | Anchor element for the `ActionTooltip`                                      |         `React.ReactElement` `Function`          |                 |
| className     | `class` HTML attribute                                                      |                     `string`                     |                 |
| closeDelay    | Number of ms to delay hiding the `ActionTooltip` after the hover ends       |                     `number`                     |       `0`       |
| container     | DOM element to which component is mounted via `Portal`                      |                  `HTMLElement`                   | `document.body` |
| description   | Description content                                                         |                `React.ReactNode`                 |                 |
| disablePortal | Disables using `Portal`                                                     |                    `boolean`                     |     `false`     |
| disabled      | Prevent the `ActionTooltip` from opening                                    |                    `boolean`                     |                 |
| hotkey        | `Hotkey` value to be shown in the top-end corner                            |   [`Hotkey` value](../Hotkey/README.md#value)    |                 |
| offset        | `ActionTooltip` offset from its anchor                                      |                     `number`                     |       `4`       |
| onOpenChange  | Callback to handle open state change                                        |                    `Function`                    |                 |
| open          | Controlled open state                                                       |                    `boolean`                     |                 |
| openDelay     | Number of ms to delay showing the `ActionTooltip` after the hover begins    |                     `number`                     |     `1000`      |
| placement     | `ActionTooltip` position relative to its anchor                             | [`PopupPlacement`](../Popup/README.md#placement) |    `bottom`     |
| qa            | `data-qa` HTML attribute, used for testing                                  |                     `string`                     |                 |
| strategy      | The type of CSS position property to use.                                   |                `absolute` `fixed`                |   `absolute`    |
| style         | `style` HTML attribute                                                      |              `React.CSSProperties`               |                 |
| title         | Title content                                                               |                     `string`                     |                 |
| trigger       | Event type that should trigger opening. By default both hover and focus do. |                    `"focus"`                     |                 |
