<!--GITHUB_BLOCK-->

# Button

<!--/GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';
```

Buttons act as a trigger for certain actions. While this is their main purpose, in very rare cases,
they can be used as links to navigate to another pages.

## Appearance

There are four `Button` view types: basic, outlined, flat and contrast.
The `Button`'s appearance is determined by the `view` property.

### Basic

`action` - the most prominent button, used for the primary action on a screen which requires the most attention.
We recommend using only one such button per page.

`normal` - default type of the `Button`, designed for secondary actions or to maintain the importance of an
action without drawing too much attention to it.

`raised` - placed above the content as a "floating" element, usually with a fixed location.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button view="action" size="l">Action</Button>
<Button view="normal" size="l">Normal</Button>
<Button view="raised" size="l">Raised</Button>
`}>
    <UIKit.Button view="action" size="l">Action</UIKit.Button>
    <UIKit.Button view="normal" size="l">Normal</UIKit.Button>
    <UIKit.Button view="raised" size="l">Raised</UIKit.Button>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="action" size="l">Action</Button>
<Button view="normal" size="l">Normal</Button>
<Button view="raised" size="l">Raised</Button>
```

<!--/GITHUB_BLOCK-->

### Outlined

`outlined` - used for secondary actions that require less attention on a page. Can be used with or without a main button (only with an accented one).

`outlined-action` - usually used as a link to another page or external resource.

There are also semantic variants of this type, which can be used when additional semantics are needed: `outlined-info`, `outlined-success`, `outlined-warning`, `outlined-danger`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-action" size="l">Outlined Action</Button>
<Button view="outlined-info" size="l">Outlined Info</Button>
<Button view="outlined-success" size="l">Outlined Success</Button>
<Button view="outlined-warning" size="l">Outlined Warning</Button>
<Button view="outlined-danger" size="l">Outlined Danger</Button>
`}>
    <UIKit.Button view="outlined" size="l">Outlined</UIKit.Button>
    <UIKit.Button view="outlined-action" size="l">Outlined Action</UIKit.Button>
    <UIKit.Button view="outlined-info" size="l">Outlined Info</UIKit.Button>
    <UIKit.Button view="outlined-success" size="l">Outlined Success</UIKit.Button>
    <UIKit.Button view="outlined-warning" size="l">Outlined Warning</UIKit.Button>
    <UIKit.Button view="outlined-danger" size="l">Outlined Danger</UIKit.Button>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-action" size="l">Outlined Action</Button>
<Button view="outlined-info" size="l">Outlined Info</Button>
<Button view="outlined-success" size="l">Outlined Success</Button>
<Button view="outlined-warning" size="l">Outlined Warning</Button>
<Button view="outlined-danger" size="l">Outlined Danger</Button>
```

<!--/GITHUB_BLOCK-->

### Flat

`flat` - used for auxiliary actions that require the least attention on a page. It is often used in a list of buttons or action icons (with no text) in an editor.

`flat-secondary` - less accented than the `flat` button. It's often used as the secondary button in dialog boxes and modal windows.

`flat-action` - usually used as link to another page or external resource.

There are also semantic variants of this view, which can be used in places where additional semantic needed: `flat-info`, `flat-success`, `flat-warning`, `flat-danger`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button view="flat" size="l">Flat</Button>
<Button view="flat-secondary" size="l">Flat Secondary</Button>
<Button view="flat-action" size="l">Flat Action</Button>
<Button view="flat-info" size="l">Flat Info</Button>
<Button view="flat-success" size="l">Flat Success</Button>
<Button view="flat-warning" size="l">Flat Warning</Button>
<Button view="flat-danger" size="l">Flat Danger</Button>
`}
>
    <UIKit.Button view="flat" size="l">Flat</UIKit.Button>
    <UIKit.Button view="flat-action" size="l">Flat Action</UIKit.Button>
    <UIKit.Button view="flat-info" size="l">Flat Info</UIKit.Button>
    <UIKit.Button view="flat-success" size="l">Flat Success</UIKit.Button>
    <UIKit.Button view="flat-warning" size="l">Flat Warning</UIKit.Button>
    <UIKit.Button view="flat-danger" size="l">Flat Danger</UIKit.Button>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="flat" size="l">Flat</Button>
<Button view="flat-secondary" size="l">Flat Secondary</Button>
<Button view="flat-action" size="l">Flat Action</Button>
<Button view="flat-info" size="l">Flat Info</Button>
<Button view="flat-success" size="l">Flat Success</Button>
<Button view="flat-warning" size="l">Flat Warning</Button>
<Button view="flat-danger" size="l">Flat Danger</Button>
```

<!--/GITHUB_BLOCK-->

### Contrast

`normal-contrast`, `outline-contrast` and `flat-contrast` buttons highlight actions against complex background, e.g., in a banner or against an inverse background.

<!--LANDING_BLOCK

<ExampleBlock
    background='rgb(68, 38, 204)'
    code={`
<Button view="normal-contrast" size="l">Normal Contrast</Button>
<Button view="outlined-contrast" size="l">Outlined Contrast</Button>
<Button view="flat-contrast" size="l">Flat Contrast</Button>
`}
>
    <UIKit.Button view="normal-contrast" size="l">Normal Contrast</UIKit.Button>
    <UIKit.Button view="outlined-contrast" size="l">Outlined Contrast</UIKit.Button>
    <UIKit.Button view="flat-contrast" size="l">Flat Contrast</UIKit.Button>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="normal-contrast" size="l">Normal Contrast</Button>
<Button view="outlined-contrast" size="l">Outlined Contrast</Button>
<Button view="flat-contrast" size="l">Flat Contrast</Button>
```

<!--/GITHUB_BLOCK-->

## Icons

To add an icon to the `Button`, you should use the [`Icon`](../Icon) component, a special wrapper for SVGs.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Start
</Button>
<Button view="outlined" size="l">
    End
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Both
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    No text:
    <Icon data={Gear} size={18} />
</Button>
`}
>
    <UIKit.Button view="outlined" size="l">
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />
        Start
    </UIKit.Button>
    <UIKit.Button view="outlined" size="l">
        End
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />
    </UIKit.Button>
    <UIKit.Button view="outlined" size="l">
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />
        Both
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />
    </UIKit.Button>
    <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
        <span>No text:</span>
        <UIKit.Button view="outlined" size="l">
            <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />
        </UIKit.Button>
    </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Start
</Button>
<Button view="outlined" size="l">
    End
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Both
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    No text:
    <Icon data={Gear} size={18} />
</Button>
```

<!--/GITHUB_BLOCK-->

## States

The `Button` can be in different states.

`disabled` - when the button is unavailable for some reason.

`loading` - when some asynchronous processes are happening in the background, `selected` - when the user can switch between "Enable" and "Disable".

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
`}
>
    <UIKit.Button size="l" disabled>Disabled</UIKit.Button>
    <UIKit.Button size="l" loading>Loading</UIKit.Button>
    <UIKit.Button size="l" selected>Selected</UIKit.Button>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
```

<!--/GITHUB_BLOCK-->

## Size

To control the size of the `Button` use the `size` property. Default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button size="xs">XS Size</Button>
<Button size="s">S Size</Button>
<Button size="m">M Size</Button>
<Button size="l">L Size</Button>
<Button size="xl">XL Size</Button>
`}
>
    <UIKit.Button size="xs">XS Size</UIKit.Button>
    <UIKit.Button size="s">S Size</UIKit.Button>
    <UIKit.Button size="m">M Size</UIKit.Button>
    <UIKit.Button size="l">L Size</UIKit.Button>
    <UIKit.Button size="xl">XL Size</UIKit.Button>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Button size="xs">XS Size</Button>
<Button size="s">S Size</Button>
<Button size="m">M Size</Button>
<Button size="l">L Size</Button>
<Button size="xl">XL Size</Button>
```

<!--/GITHUB_BLOCK-->

## Width

The `width` property controls how the `Button` behaves inside the container.

`auto` - limits the maximum width of the component, hides overflowing content with an ellipsis.

`max` - matches the width to the width of the parent container, also hides overflowing content with an ellipsis.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Button>Default</Button>
<Button width="auto">Auto</Button>
<Button width="max">Max</Button>
`}
>
    <div style={{width: 100, border: '2px dashed gray'}}>
        <h4 style={{textAlign: 'center'}}>Default</h4>
        <p>
            <UIKit.Button>Text</UIKit.Button>
        </p>
        <p>
            <UIKit.Button>Very Long Text</UIKit.Button>
        </p>
    </div>
    <div style={{width: 100, border: '2px dashed gray'}}>
        <h4 style={{textAlign: 'center'}}>Auto</h4>
        <p>
            <UIKit.Button width="auto">Text</UIKit.Button>
        </p>
        <p>
            <UIKit.Button width="auto">Very Long Text</UIKit.Button>
        </p>
    </div>
    <div style={{width: 100, border: '2px dashed gray'}}>
        <h4 style={{textAlign: 'center'}}>Max</h4>
        <p>
            <UIKit.Button width="max">Text</UIKit.Button>
        </p>
        <p>
            <UIKit.Button width="max">Very Long Text</UIKit.Button>
        </p>
    </div>
</ExampleBlock>

LANDING_BLOCK-->

## Pin

The `pin` property allows you to control the shape of the "start" and "end" edges and is usually used for combining multiple buttons in a single unit.
The value of the `pin` property consists of "start" and "end" style names divided by a dash, e.g. `"round-brick"`.
The edge styles are: `round` (default), `circle`, `brick` and `clear`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<div>
    <Button view="action" size="l" pin="round-clear">Create</Button>
    <Button view="action" size="l" pin="brick-round">...</Button>
</div>
<div>
    <Button view="normal" size="l" pin="circle-clear">Start</Button>
    <Button view="normal" size="l" pin="brick-brick" selected>Center</Button>
    <Button view="normal" size="l" pin="clear-circle">End</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4</Button>
</div>
`}
>
    <div>
        <UIKit.Button view="action" size="l" pin="round-clear">Create</UIKit.Button>
        <UIKit.Button view="action" size="l" pin="brick-round">...</UIKit.Button>
    </div>
    <div>
        <UIKit.Button view="normal" size="l" pin="circle-clear">Start</UIKit.Button>
        <UIKit.Button view="normal" size="l" pin="brick-brick" selected>Center</UIKit.Button>
        <UIKit.Button view="normal" size="l" pin="clear-circle">End</UIKit.Button>
    </div>
    <div>
        <UIKit.Button view="outlined" pin="brick-clear">1</UIKit.Button>
        <UIKit.Button view="outlined" pin="clear-clear">2</UIKit.Button>
        <UIKit.Button view="outlined" pin="clear-clear">3</UIKit.Button>
        <UIKit.Button view="outlined" pin="clear-brick">4</UIKit.Button>
    </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
    <Button view="action" size="l" pin="round-brick">Create</Button>
    <Button view="action" size="l" pin="brick-round">...</Button>
</div>
<div>
    <Button view="normal" size="l" pin="circle-clear">Start</Button>
    <Button view="normal" size="l" pin="brick-brick" selected>Center</Button>
    <Button view="normal" size="l" pin="clear-circle">End</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4</Button>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name         | Description                                               |              Type               |     Default     |
| :----------- | :-------------------------------------------------------- | :-----------------------------: | :-------------: |
| children     | Button content. You can mix text with `<Icon/>` component |           `ReactNode`           |                 |
| className    | HTML `class` attribute                                    |            `string`             |                 |
| component    | Overrides the root component                              |       `ElementType<any>`        |   `"button"`    |
| disabled     | Toggles `disabled` state                                  |             `false`             |     `false`     |
| extraProps   | Any additional props                                      |            `Record`             |                 |
| href         | HTML `href` attribute                                     |            `string`             |                 |
| id           | HTML `id` attribute                                       |            `string`             |                 |
| loading      | Toggles `loading` state                                   |             `false`             |     `false`     |
| onBlur       | `blur` event handler                                      |           `Function`            |                 |
| onClick      | `click` event handler                                     |           `Function`            |                 |
| onFocus      | `focus` event handler                                     |           `Function`            |                 |
| onMouseEnter | `mouseenter` event handler                                |           `Function`            |                 |
| onMouseLeave | `mouseleave` event handler                                |           `Function`            |                 |
| pin          | Sets button edges style                                   |            `string`             | `"round-round"` |
| qa           | HTML `data-qa` attribute, used in tests                   |            `string`             |                 |
| rel          | HTML `rel` attribute                                      |            `string`             |                 |
| selected     | Toggles `selected` state                                  |                                 |                 |
| size         | Sets button size                                          |            `string`             |      `"m"`      |
| style        | HTML `style` attribute                                    |      `React.CSSProperties`      |                 |
| tabIndex     | HTML `tabIndex` attribute                                 |            `number`             |                 |
| target       | HTML `target` attribute                                   |            `string`             |                 |
| title        | HTML `title` attribute                                    |            `string`             |                 |
| type         | HTML `type` attribute                                     | `"button"` `"submit"` `"reset"` |   `"button"`    |
| view         | Sets button appearance                                    |            `string`             |   `"normal"`    |
| width        | `"auto"` `"max"`                                          |        `"auto"` `"max"`         |                 |

## CSS API

| Name                                | Description               |
| :---------------------------------- | :------------------------ |
| `--g-button-text-color`             | Text color                |
| `--g-button-text-color-hover`       | Text color on hover       |
| `--g-button-background-color`       | Background color          |
| `--g-button-background-color-hover` | Background color on hover |
| `--g-button-border-width`           | Border width              |
| `--g-button-border-color`           | Border color              |
| `--g-button-border-style`           | Border style              |
| `--g-button-focus-outline-width`    | Focus outline color       |
| `--g-button-focus-outline-color`    | Focus outline color       |
| `--g-button-focus-outline-style`    | Focus outline style       |
| `--g-button-focus-outline-offset`   | Focus outline offset      |
| `--g-button-height`                 | Height, line-height       |
| `--g-button-padding`                | Side paddings             |
| `--g-button-border-radius`          | Border radius             |
| `--g-button-font-size`              | Text font size            |
| `--g-button-icon-size`              | Icon size                 |
| `--g-button-icon-offset`            | Icon offset               |
