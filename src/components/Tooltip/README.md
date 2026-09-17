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

## Delay Group

Wrap a set of tooltips into `TooltipDelayGroup` to make them share the open delay. The first tooltip of a group
pays its own `openDelay`, so an accidental mouse move still opens nothing. While the group is warm — a tooltip
is open or has been closed less than `skipDelay` ago — its neighbours open instantly, and no more than one
tooltip of the group is open at a time. This suits toolbars and rows of icon buttons, where waiting for the delay
on every button feels slow.

```tsx
import {ActionTooltip, TooltipDelayGroup} from '@gravity-ui/uikit';

<TooltipDelayGroup>
  <ActionTooltip title="Bold" hotkey="mod+b">
    <Button view="flat">{/* ... */}</Button>
  </ActionTooltip>
  <ActionTooltip title="Italic" hotkey="mod+i">
    <Button view="flat">{/* ... */}</Button>
  </ActionTooltip>
</TooltipDelayGroup>;
```

`Tooltip` and `ActionTooltip` join the closest group automatically, keeping their own `openDelay` for the cold
start. Tooltips outside of a group behave exactly as before. Opening by focus is instant with or without a group,
so the keyboard is not affected.

### TooltipDelayGroup properties

| Name       | Description                                                                                          |       Type        | Default |
| :--------- | ---------------------------------------------------------------------------------------------------- | :---------------: | :-----: |
| children   | Tooltips sharing the open delay                                                                      | `React.ReactNode` |         |
| closeDelay | Number of ms to delay hiding a tooltip of a warm group, overrides `closeDelay` of the group tooltips |     `number`      |  `200`  |
| skipDelay  | Number of ms the group stays warm after its last tooltip is closed                                   |     `number`      |  `300`  |

## Properties

| Name          | Description                                                                                     |                       Type                       |     Default     |
| :------------ | ----------------------------------------------------------------------------------------------- | :----------------------------------------------: | :-------------: |
| children      | Anchor element for the `Tooltip`                                                                |         `React.ReactElement` `Function`          |                 |
| className     | `class` HTML attribute                                                                          |                     `string`                     |                 |
| closeDelay    | Number of ms to delay hiding the `Tooltip` after the hover ends                                 |                     `number`                     |       `0`       |
| container     | DOM element to which component is mounted via `Portal`                                          |                  `HTMLElement`                   | `document.body` |
| content       | Content that will be shown in the `Tooltip`                                                     |                `React.ReactNode`                 |                 |
| disablePortal | Disables using `Portal`                                                                         |                    `boolean`                     |     `false`     |
| disabled      | Prevent the `Tooltip` from opening                                                              |                    `boolean`                     |                 |
| offset        | `Tooltip` offset from its anchor                                                                |                     `number`                     |       `4`       |
| onOpenChange  | Callback to handle open state change                                                            |                    `Function`                    |                 |
| open          | Controlled open state                                                                           |                    `boolean`                     |                 |
| openDelay     | Number of ms to delay showing the `Tooltip` after the hover begins                              |                     `number`                     |     `1000`      |
| placement     | `Tooltip` position relative to its anchor                                                       | [`PopupPlacement`](../Popup/README.md#placement) |    `bottom`     |
| qa            | `data-qa` HTML attribute, used for testing                                                      |                     `string`                     |                 |
| rest          | How much time in ms the cursor must be rest before open.                                        |                     `number`                     |       `0`       |
| role          | The role `Tooltip` is used for                                                                  |              `"tooltip"` `"label"`               |   `"tooltip"`   |
| strategy      | The type of CSS position property to use.                                                       |                `absolute` `fixed`                |   `absolute`    |
| style         | `style` HTML attribute                                                                          |              `React.CSSProperties`               |                 |
| trigger       | Event type that should trigger opening. Default `all` value refers to both `hover` and `focus`. |                `"all"` `"focus"`                 |     `"all"`     |

## CSS API

| Name                           | Description      |
| :----------------------------- | :--------------- |
| `--g-tooltip-text-color`       | Text color       |
| `--g-tooltip-background-color` | Background color |
| `--g-tooltip-padding`          | Padding          |
| `--g-tooltip-border-radius`    | Border radius    |
| `--g-tooltip-box-shadow`       | Shadow           |
