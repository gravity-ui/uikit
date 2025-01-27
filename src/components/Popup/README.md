<!--GITHUB_BLOCK-->

# Popup

<!--/GITHUB_BLOCK-->

```tsx
import {Popup} from '@gravity-ui/uikit';
```

You can use a `Popup` to display floating content above the page. Technically, it is a wrapper around [Popper.js](https://popper.js.org) with some default values. To manage `Popup` visibility, use the `open` property.
The `Popup` child components are rendered inside the [`Portal`](../Portal) component. To disable this behavior, use the `disablePortal` property.

## Anchor

Ref object of the DOM element is provided to the `anchorRef` property to create a `Popper.js` instance.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const buttonRef = React.useRef(null);
const [open, setOpen] = React.useState(false);

<Button ref={buttonRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
  Toggle Popup
</Button>
<Popup anchorRef={buttonRef} open={open} placement="bottom">
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
<Popup anchorRef={buttonRef} open={open} placement="bottom">
  Content
</Popup>
```

<!--/GITHUB_BLOCK-->

## Placement

Use the `placement` property to manage the `Popup` position around the anchor element.
It accepts all values from the `Popper.js` [placement](https://popper.js.org/docs/v2/constructors/#options).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const boxRef = React.useRef(null);

<div ref={boxRef} />
<Popup open anchorRef={boxRef} placement="top-start">Top Start</Popup>
<Popup open anchorRef={boxRef} placement="top">Top</Popup>
<Popup open anchorRef={boxRef} placement="top-end">Top End</Popup>
<Popup open anchorRef={boxRef} placement="right-start">Right Start</Popup>
<Popup open anchorRef={boxRef} placement="right">Right</Popup>
<Popup open anchorRef={boxRef} placement="right-end">Right End</Popup>
<Popup open anchorRef={boxRef} placement="bottom-end">Bottom End</Popup>
<Popup open anchorRef={boxRef} placement="bottom">Bottom</Popup>
<Popup open anchorRef={boxRef} placement="bottom-start">Bottom Start</Popup>
<Popup open anchorRef={boxRef} placement="left-end">Left End</Popup>
<Popup open anchorRef={boxRef} placement="left">Left</Popup>
<Popup open anchorRef={boxRef} placement="left-start">Left Start</Popup>
`}>
    <UIKitExamples.PopupPlacementExample/>
</ExampleBlock>

LANDING_BLOCK-->

## Properties

| Name                 | Description                                                                         |                   Type                   |             Default              |
| :------------------- | :---------------------------------------------------------------------------------- | :--------------------------------------: | :------------------------------: |
| altBoundary          | `altBoundary` parameter for the `Popper.js` `offset` modifier                       |                `boolean`                 |             `false`              |
| anchorRef            | `Popper.js` anchor element that can also be `popper.VirtualElement`                 |             `PopupAnchorRef`             |                                  |
| autoFocus            | While open, the focus will be set to the first interactive element in the content   |                `boolean`                 |             `false`              |
| children             | Any React content                                                                   |            `React.ReactNode`             |                                  |
| className            | `class` HTML attribute for the root node                                            |                 `string`                 |                                  |
| container            | DOM element children to mount                                                       |              `HTMLElement`               |         `document.body`          |
| contentClassName     | `class` HTML attribute for the content node                                         |                 `string`                 |                                  |
| disableEscapeKeyDown | Disables triggering close on `Esc`                                                  |                `boolean`                 |             `false`              |
| disableLayer         | Disables using `LayerManager` on stacking popups                                    |                `boolean`                 |             `false`              |
| disableOutsideClick  | Disables triggering close on outside clicks                                         |                `boolean`                 |             `false`              |
| disablePortal        | Disables using `Portal` for children                                                |                `boolean`                 |             `false`              |
| focusTrap            | Enables focus trapping behavior                                                     |                `boolean`                 |             `false`              |
| hasArrow             | Renders arrow pointing to the anchor                                                |                `boolean`                 |             `false`              |
| id                   | `id` HTML attribute                                                                 |                 `string`                 |                                  |
| keepMounted          | `Popup` will not be removed from the DOM upon hiding                                |                `boolean`                 |             `false`              |
| modifiers            | `Popper.js` modifiers in addition to the default one: `arrow`, `offset`, and `flip` |                 `Array`                  |             `[0, 4]`             |
| offset               | `Popper.js` offset                                                                  |            `[number, number]`            |             `[0, 4]`             |
| onBlur               | `blur` event handler                                                                |                `Function`                |                                  |
| onClose              | Handles `Popup` close event                                                         |                `Function`                |                                  |
| onEnterKeyDown       | `Enter` press event handler                                                         |                `Function`                |                                  |
| onEscapeKeyDown      | `Esc` press event handler                                                           |                `Function`                |                                  |
| onFocus              | `focus` event handler                                                               |                `Function`                |                                  |
| onMouseEnter         | `mouseenter` event handler                                                          |                `Function`                |                                  |
| onMouseLeave         | `mouseleave` event handler                                                          |                `Function`                |                                  |
| onOutsideClick       | Outside click event handler                                                         |                `Function`                |                                  |
| onTransitionEnter    | Open popup animation on start                                                       |                `Function`                |                                  |
| onTransitionEntered  | Open popup animation on finish                                                      |                `Function`                |                                  |
| onTransitionExit     | Close popup animation on start                                                      |                `Function`                |                                  |
| onTransitionExited   | Close popup animation on finish                                                     |                `Function`                |                                  |
| open                 | Manages `Popup` visibility                                                          |                `boolean`                 |             `false`              |
| placement            | `Popper.js` placement                                                               | `PopupPlacement` `Array<PopupPlacement>` |                                  |
| qa                   | Test attribute (`data-qa`)                                                          |                 `string`                 |                                  |
| restoreFocus         | If true, the focus will return to the anchor element                                |                `boolean`                 |             `false`              |
| restoreFocusRef      | Element the focus will be restored to                                               |            `React.RefObject`             |                                  |
| aria-labelledby      | `aria-labelledby` attribute. Preferable if you have visible caption                 |                 `string`                 |                                  |
| aria-label           | `aria-label` attribute. Use it only if you do not have any visible caption          |                 `string`                 |                                  |
| aria-modal           | Shows whether an element is modal when displayed                                    |               `Booleanish`               |        `focusTrap` value         |
| role                 | Accessibility role for popup                                                        |                 `string`                 | `dialog` if `aria-modal` is true |
| strategy             | `Popper.js` positioning strategy                                                    |       `popper.PositioningStrategy`       |             `[0, 4]`             |
| style                | `style` HTML attribute for root node                                                |                 `string`                 |                                  |

## CSS API

| Name                         | Description      |
| :--------------------------- | :--------------- |
| `--g-popup-background-color` | Background color |
| `--g-popup-border-color`     | Border color     |
| `--g-popup-border-width`     | Border width     |
