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
const [buttonElement, setButtonElement] = React.useState(null);
const [open, setOpen] = React.useState(false);

<Button ref={setButtonElement} onClick={() => setOpen((prevOpen) => !prevOpen)}>
  Toggle Popup
</Button>
<Popup anchorElement={buttonElement} open={open} placement="bottom">
  Content
</Popup>
`}>
    <UIKitExamples.PopupAnchorExample/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const [buttonElement, setButtonElement] = React.useState(null);
const [open, setOpen] = React.useState(false);

<Button ref={setButtonElement} onClick={() => setOpen((prevOpen) => !prevOpen)}>
  Toggle Popup
</Button>
<Popup anchorElement={buttonElement} open={open} placement="bottom">
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
const [boxElement, setBoxElement] = React.useState(null);

<div ref={setBoxElement} />
<Popup open anchorElement={boxElement} placement="top-start">Top Start</Popup>
<Popup open anchorElement={boxElement} placement="top">Top</Popup>
<Popup open anchorElement={boxElement} placement="top-end">Top End</Popup>
<Popup open anchorElement={boxElement} placement="right-start">Right Start</Popup>
<Popup open anchorElement={boxElement} placement="right">Right</Popup>
<Popup open anchorElement={boxElement} placement="right-end">Right End</Popup>
<Popup open anchorElement={boxElement} placement="bottom-end">Bottom End</Popup>
<Popup open anchorElement={boxElement} placement="bottom">Bottom</Popup>
<Popup open anchorElement={boxElement} placement="bottom-start">Bottom Start</Popup>
<Popup open anchorElement={boxElement} placement="left-end">Left End</Popup>
<Popup open anchorElement={boxElement} placement="left">Left</Popup>
<Popup open anchorElement={boxElement} placement="left-start">Left Start</Popup>
`}>
    <UIKitExamples.PopupPlacementExample/>
</ExampleBlock>

LANDING_BLOCK-->

## Properties

| Name                    | Description                                                                                |                             Type                              |     Default     |
| :---------------------- | :----------------------------------------------------------------------------------------- | :-----------------------------------------------------------: | :-------------: |
| anchorElement           | Anchor element. Can also be a `VirtualElement`                                             |                     `PopupAnchorElement`                      |                 |
| aria-describedby        | `aria-describedby` attribute. Use it if you have both label and description nodes          |                           `string`                            |                 |
| aria-label              | `aria-label` attribute. Use it only if you do not have any visible caption                 |                           `string`                            |                 |
| aria-labelledby         | `aria-labelledby` attribute. Preferable if you have visible caption                        |                           `string`                            |                 |
| children                | Any React content                                                                          |                       `React.ReactNode`                       |                 |
| className               | `class` HTML attribute for the root node                                                   |                           `string`                            |                 |
| container               | DOM element to which component is mounted via `Portal`                                     |                         `HTMLElement`                         | `document.body` |
| disableEscapeKeyDown    | Disables triggering close on `Esc`                                                         |                           `boolean`                           |     `false`     |
| disableFocusOut         | Disables triggering close on focusout                                                      |                           `boolean`                           |     `false`     |
| disableOutsideClick     | Disables triggering close on outside clicks                                                |                           `boolean`                           |     `false`     |
| disablePortal           | Disables using `Portal`                                                                    |                           `boolean`                           |     `false`     |
| disableTransition       | Disables animation of popup appearing/disappearing                                         |                           `boolean`                           |     `false`     |
| floatingClassName       | Additional class to apply to the `Floating UI` element                                     |                           `string`                            |                 |
| floatingContext         | `Floating UI` context to provide interactions                                              |                     `FloatingRootContext`                     |                 |
| floatingInteractions    | Override `Floating UI` interactions                                                        |                     `Array<ElementProps>`                     |                 |
| floatingMiddlewares     | `Floating UI` middlewares. If set, they will completely overwrite the default middlewares. |                      `Array<Middleware>`                      |                 |
| floatingStyles          | Styles to apply to the `Floating UI` element                                               |                     `React.CSSProperties`                     |                 |
| focusOrder              | The order in which focus circle                                                            |        `Array<'reference' \| 'floating' \| 'content'>`        |  `['content']`  |
| hasArrow                | Renders arrow pointing to the anchor                                                       |                           `boolean`                           |     `false`     |
| id                      | `id` HTML attribute                                                                        |                           `string`                            |                 |
| initialFocus            | Initial element to be focused. Positive number is the index of tabbable element.           |               `number` `React.Ref<HTMLElement>`               |                 |
| keepMounted             | `Popup` will not be removed from the DOM upon hiding                                       |                           `boolean`                           |     `false`     |
| modal                   | Enables focus trapping behaviour                                                           |                           `boolean`                           |     `false`     |
| offset                  | `Floating UI` offset value                                                                 |                         `PopupOffset`                         |       `4`       |
| onOpenChange            | Handles `Popup` open change event                                                          |                          `Function`                           |                 |
| onTransitionIn          | On start open popup animation                                                              |                          `Function`                           |                 |
| onTransitionInComplete  | On finish open popup animation                                                             |                          `Function`                           |                 |
| onTransitionOut         | On start close popup animation                                                             |                          `Function`                           |                 |
| onTransitionOutComplete | On finish close popup animation                                                            |                          `Function`                           |                 |
| open                    | Manages `Popup` visibility                                                                 |                           `boolean`                           |     `false`     |
| placement               | `Floating UI` placement                                                                    | `Placement` `Array<Placement>` `auto` `auto-start` `auto-end` |                 |
| qa                      | Test attribute (`data-qa`)                                                                 |                           `string`                            |                 |
| returnFocus             | Element to be focused on closing                                                           |              `boolean` `React.Ref<HTMLElement>`               |     `true`      |
| role                    | Accessibility role for popup                                                               |                           `string`                            |                 |
| strategy                | `Floating UI` positioning strategy                                                         |                      `absolute` `fixed`                       |   `absolute`    |
| style                   | `style` HTML attribute for root node                                                       |                     `React.CSSProperties`                     |                 |

## CSS API

| Name                         | Description      |
| :--------------------------- | :--------------- |
| `--g-popup-background-color` | Background color |
| `--g-popup-border-color`     | Border color     |
| `--g-popup-border-radius`    | Border radius    |
| `--g-popup-border-width`     | Border width     |
