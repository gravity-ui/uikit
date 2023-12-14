<!--GITHUB_BLOCK-->

# Popup

<!--/GITHUB_BLOCK-->

```tsx
import {Popup} from '@gravity-ui/uikit';
```

`Popup` can be used to display floating content above the page. It is a wrapper around [Popper.js](https://popper.js.org)
with some defaults. To manage `Popup` visibility, use the `open` property.
The `Popup` child components are rendered inside the [`Portal`](../Portal) component. To disable this behavior, use the `disablePortal` property.

## Anchor

Ref object of the DOM element is passed to the `anchorRef` property to create a `Popper.js` instance.

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

Use `placement` property to control `Popup` position around the anchor element.
Accept all values from `Popper.js` [placement](https://popper.js.org/docs/v2/constructors/#options).

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

| Name                 | Description                                                                        |                   Type                   |     Default     |
| :------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------: | :-------------: |
| altBoundary          | `altBoundary` parameter for `Popper.js` `offset` modifier                          |                `boolean`                 |     `false`     |
| anchorRef            | `Popper.js` anchor element. Can also be `popper.VirtualElement`                    |             `PopupAnchorRef`             |                 |
| autoFocus            | While open, the focus will be set to the first interactive element in the content  |                `boolean`                 |     `false`     |
| children             | Any React content                                                                  |            `React.ReactNode`             |                 |
| className            | HTML `class` attribute for root node                                               |                 `string`                 |                 |
| container            | DOM element children to be mounted to                                              |              `HTMLElement`               | `document.body` |
| contentClassName     | HTML `class` attribute for content node                                            |                 `string`                 |                 |
| disableEscapeKeyDown | Do not trigger close on `Esc`                                                      |                `boolean`                 |     `false`     |
| disableLayer         | Do not use `LayerManager` on stacking popups                                       |                `boolean`                 |     `false`     |
| disableOutsideClick  | Do not trigger close on outside clicks                                             |                `boolean`                 |     `false`     |
| disablePortal        | Do not use `Portal` for children                                                   |                `boolean`                 |     `false`     |
| focusTrap            | Enable focus trapping behavior                                                     |                `boolean`                 |     `false`     |
| hasArrow             | Render an arrow pointing to the anchor                                             |                `boolean`                 |     `false`     |
| id                   | HTML `id` attribute                                                                |                 `string`                 |                 |
| keepMounted          | `Popup` will not be removed from the DOM upon hiding                               |                `boolean`                 |     `false`     |
| modifiers            | `Popper.js` modifiers in addition to default: `arrow`, `offset`, `flip`            |                 `Array`                  |    `[0, 4]`     |
| offset               | `Popper.js` offset                                                                 |            `[number, number]`            |    `[0, 4]`     |
| onBlur               | `blur` event handler                                                               |                `Function`                |                 |
| onClose              | Handle `Popup` close event                                                         |                `Function`                |                 |
| onEnterKeyDown       | `Enter` press event handler                                                        |                `Function`                |                 |
| onEscapeKeyDown      | `Esc` press event handler                                                          |                `Function`                |                 |
| onFocus              | `focus` event handler                                                              |                `Function`                |                 |
| onMouseEnter         | `mouseenter` event handler                                                         |                `Function`                |                 |
| onMouseLeave         | `mouseleave` event handler                                                         |                `Function`                |                 |
| onOutsideClick       | Outside click event handler                                                        |                `Function`                |                 |
| open                 | Manages `Popup` visibility                                                         |                `boolean`                 |     `false`     |
| placement            | `Popper.js` placement                                                              | `PopupPlacement` `Array<PopupPlacement>` |                 |
| qa                   | Test attribute (`data-qa`)                                                         |                 `string`                 |                 |
| restoreFocus         | If true, the focus will return to the anchor element                               |                `boolean`                 |     `false`     |
| restoreFocusRef      | Element the focus will be restored to                                              |            `React.RefObject`             |                 |
| aria-labelledby      | `aria-labelledby` attribute, prefer this attribute if you have visible caption     |                 `string`                 |                 |
| aria-label           | `aria-label` attribute, use this attribute only if you didn't have visible caprion |                 `string`                 |                 |
| role                 | `aria-role` attribute                                                              |                 `string`                 |                 |
| role                 | `aria-role` attribute                                                              |                 `string`                 |                 |
| strategy             | `Popper.js` positioning strategy                                                   |       `popper.PositioningStrategy`       |    `[0, 4]`     |
| style                | HTML `style` atribute for root node                                                |                 `string`                 |                 |
