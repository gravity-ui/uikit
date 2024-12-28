<!--GITHUB_BLOCK-->

# Popup

<!--/GITHUB_BLOCK-->

```tsx
import {Popup} from '@gravity-ui/uikit';
```

You can use a `Popup` to display floating content above the page. Technically, it is a wrapper around [Floating UI](https://floating-ui.com) with some default values. To manage `Popup` visibility, use the `open` property.
The `Popup` child components are rendered inside the [`Portal`](../Portal) component. To disable this behavior, use the `disablePortal` property.

## Anchor

To specify the anchor of a floating element, you can use the `anchorElement` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const buttonRef = React.useRef(null);
const [open, setOpen] = React.useState(false);

<Button ref={buttonRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
  Toggle Popup
</Button>
<Popup anchorElement={buttonRef.current} open={open} placement="bottom">
  Content
</Popup>
`}>
    <UIKitExamples.PopupAnchorExample/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const buttonRef = React.useRef(null);
const [open, setOpen] = React.useState(false);

<Button ref={buttonRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
  Toggle Popup
</Button>
<Popup anchorElement={buttonRef.current} open={open} placement="bottom">
  Content
</Popup>
```

<!--/GITHUB_BLOCK-->

## Placement

Use the `placement` property to manage the `Popup` position around the anchor element.
By default, `Popup` uses [flip middleware](https://floating-ui.com/docs/flip) to prevent overflow.
If the property is set to an array, the first element will be used as the default placement value, the rest will be used as [fallback placements](https://floating-ui.com/docs/flip#fallbackplacements).
It is also acceptable to use the values `auto`, `auto-start`, `auto-end` to use [autoPlacement middleware](https://floating-ui.com/docs/autoPlacement) instead of flip.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const boxRef = React.useRef(null);

<div ref={boxRef} />
<Popup open anchorElement={boxRef.current} placement="top-start">Top Start</Popup>
<Popup open anchorElement={boxRef.current} placement="top">Top</Popup>
<Popup open anchorElement={boxRef.current} placement="top-end">Top End</Popup>
<Popup open anchorElement={boxRef.current} placement="right-start">Right Start</Popup>
<Popup open anchorElement={boxRef.current} placement="right">Right</Popup>
<Popup open anchorElement={boxRef.current} placement="right-end">Right End</Popup>
<Popup open anchorElement={boxRef.current} placement="bottom-end">Bottom End</Popup>
<Popup open anchorElement={boxRef.current} placement="bottom">Bottom</Popup>
<Popup open anchorElement={boxRef.current} placement="bottom-start">Bottom Start</Popup>
<Popup open anchorElement={boxRef.current} placement="left-end">Left End</Popup>
<Popup open anchorElement={boxRef.current} placement="left">Left</Popup>
<Popup open anchorElement={boxRef.current} placement="left-start">Left Start</Popup>
`}>
    <UIKitExamples.PopupPlacementExample/>
</ExampleBlock>

LANDING_BLOCK-->

## Properties

| Name                 | Description                                                                                |                             Type                              |             Default              |
| :------------------- | :----------------------------------------------------------------------------------------- | :-----------------------------------------------------------: | :------------------------------: |
| anchorElement        | Anchor element. Can also be `VirtualElement`                                               |                     `PopupAnchorElement`                      |                                  |
| autoFocus            | While open, the focus will be set to the first interactive element in the content          |                           `boolean`                           |             `false`              |
| children             | Any React content                                                                          |                       `React.ReactNode`                       |                                  |
| className            | `class` HTML attribute for the root node                                                   |                           `string`                            |                                  |
| container            | DOM element the children will be mounted to                                                |                         `HTMLElement`                         |         `document.body`          |
| contentClassName     | `class` HTML attribute for the content node                                                |                           `string`                            |                                  |
| disableEscapeKeyDown | Disables triggering close on `Esc`                                                         |                           `boolean`                           |             `false`              |
| disableLayer         | Disables using `LayerManager` on stacking popups                                           |                           `boolean`                           |             `false`              |
| disableOutsideClick  | Disables triggering close on outside clicks                                                |                           `boolean`                           |             `false`              |
| disablePortal        | Disables using `Portal` for children                                                       |                           `boolean`                           |             `false`              |
| focusTrap            | Enables focus trapping behavior                                                            |                           `boolean`                           |             `false`              |
| hasArrow             | Renders arrow pointing to the anchor                                                       |                           `boolean`                           |             `false`              |
| id                   | `id` HTML attribute                                                                        |                           `string`                            |                                  |
| keepMounted          | `Popup` will not be removed from the DOM upon hiding                                       |                           `boolean`                           |             `false`              |
| middlewares          | `Floating UI` middlewares. If set, they will completely overwrite the default middlewares. |                      `Array<Middleware>`                      |                                  |
| offset               | `Floating UI` offset value                                                                 |                         `PopupOffset`                         |               `4`                |
| floatingContext      | `Floating UI` context to provide interactions                                              |                     `FloatingRootContext`                     |                                  |
| floatingProps        | Additional floating element props to provide interactions                                  |                   `Record<string, unknown>`                   |                                  |
| onBlur               | `blur` event handler                                                                       |                          `Function`                           |                                  |
| onClose              | Handles `Popup` close event                                                                |                          `Function`                           |                                  |
| onEnterKeyDown       | `Enter` press event handler                                                                |                          `Function`                           |                                  |
| onEscapeKeyDown      | `Esc` press event handler                                                                  |                          `Function`                           |                                  |
| onFocus              | `focus` event handler                                                                      |                          `Function`                           |                                  |
| onMouseEnter         | `mouseenter` event handler                                                                 |                          `Function`                           |                                  |
| onMouseLeave         | `mouseleave` event handler                                                                 |                          `Function`                           |                                  |
| onOutsideClick       | Outside click event handler                                                                |                          `Function`                           |                                  |
| onTransitionEnter    | On start open popup animation                                                              |                          `Function`                           |                                  |
| onTransitionEntered  | On finish open popup animation                                                             |                          `Function`                           |                                  |
| onTransitionExit     | On start close popup animation                                                             |                          `Function`                           |                                  |
| onTransitionExited   | On finish close popup animation                                                            |                          `Function`                           |                                  |
| open                 | Manages `Popup` visibility                                                                 |                           `boolean`                           |             `false`              |
| placement            | `Floating UI` placement                                                                    | `Placement` `Array<Placement>` `auto` `auto-start` `auto-end` |                                  |
| qa                   | Test attribute (`data-qa`)                                                                 |                           `string`                            |                                  |
| restoreFocus         | If true, the focus will return to the anchor element                                       |                           `boolean`                           |             `false`              |
| restoreFocusRef      | Element the focus will be restored to                                                      |                       `React.RefObject`                       |                                  |
| aria-labelledby      | `aria-labelledby` attribute. Preferable if you have visible caption                        |                           `string`                            |                                  |
| aria-label           | `aria-label` attribute. Use it only if you do not have any visible caption                 |                           `string`                            |                                  |
| aria-modal           | `aria-modal` attribute. Indicates whether an element is modal when displayed               |                         `Booleanish`                          |       value of `focusTrap`       |
| role                 | Accessibility role for popup                                                               |                           `string`                            | `dialog` if `aria-modal` is true |
| strategy             | `Floating UI` positioning strategy                                                         |                      `absolute` `fixed`                       |            `absolute`            |
| style                | `style` HTML attribute for root node                                                       |                           `string`                            |                                  |

## CSS API

| Name                         | Description      |
| :--------------------------- | :--------------- |
| `--g-popup-background-color` | Background color |
| `--g-popup-border-color`     | Border color     |
| `--g-popup-border-width`     | Border width     |
