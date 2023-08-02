```ts
import {Button} from '@gravity-ui/uikit';
```

## Description

Buttons act as a trigger for certain actions. While this is their main purpose, in very rare cases,
they are used in place of links to navigate to a different page.

Buttons are also used in dialog boxes when the interface suggests that users perform some alternative actions.
For example, continue or return to editing.

## Appearance

To design the UI of cloud services, we use 5 basic (`action`, `normal`, `outline`, `flat`, `raised`),
5 additional (`outline-info`, `outline-danger`, `flat-info`, `flat-danger`, `flat-secondary`),
and 3 special (`normal-contrast`, `outline-contrast`, `flat-contrast`) types of buttons.
The button's appearance is controlled by the `view` property.

### Regular

Normal - This is the main type of button (used by default). It is designed for secondary actions or when you have to maintain
the importance of an action without drawing too much attention to it.

Action - This is the most prominent button, used for the primary action on a screen, which requires the most attention.
We recommend only using one such button per page (excluding dialog boxes).

Raised - The button placed above the content, usually with a fixed location.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button view="normal" size="l">Normal</Button>
<Button view="action" size="l">Action</Button>
<Button view="raised" size="l">Raised</Button>
`}>
    <UIKit.Button view="normal" size="l">Normal</UIKit.Button>
    <UIKit.Button view="action" size="l">Action</UIKit.Button>
    <UIKit.Button view="raised" size="l">Raised</UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button view="normal" size="l">Normal</Button>
<Button view="action" size="l">Action</Button>
<Button view="raised" size="l">Raised</Button>
```

<!--/GITHUB_BLOCK-->

### Outlined

Outlined - Used for secondary actions that require less attention on a page. It can be used both with the main button and without it (only with an accented one).

Outlined-info - Used to indicate where to go to a different service or external resource.

Outline-danger - Danger buttons are used to indicate dangerous actions such as delete, stop, restart, or escape.
`outline-danger` is used when there is enough space to place a full-featured button on a page or in a modal window.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-info" size="l">Outlined info</Button>
<Button view="outlined-danger" size="l">Outlined danger</Button>
`}
>
    <UIKit.Button view="outlined" size="l">
        Outlined
    </UIKit.Button>
    <UIKit.Button view="outlined-info" size="l">
        Outlined info
    </UIKit.Button>
    <UIKit.Button view="outlined-danger" size="l">
        Outlined danger
    </UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-info" size="l">Outlined info</Button>
<Button view="outlined-danger" size="l">Outlined danger</Button>
```

<!--/GITHUB_BLOCK-->

### Flat

Flat - Used for auxiliary actions that require the least attention on a page. It is often used in a list of buttons or action icons (with no text) in an editor.

Flat-info - Used to indicate where to go to a different service or external resource.

Flat-danger - Used to indicate a destructive action in a general list of actions on an object or in a drop-down menu.

Flat-secondary - This button is less accented than a `flat` button. It's often used as the secondary button in dialog boxes and modal windows.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button view="flat" size="l">Flat</Button>
<Button view="flat-info" size="l">Flat info</Button>
<Button view="flat-danger" size="l">Flat danger</Button>
<Button view="flat-secondary" size="l">Flat secondary</Button>
`}
>
    <UIKit.Button view="flat" size="l">
        Flat
    </UIKit.Button>
    <UIKit.Button view="flat-info" size="l">
        Flat info
    </UIKit.Button>
    <UIKit.Button view="flat-danger" size="l">
        Flat danger
    </UIKit.Button>
    <UIKit.Button view="flat-secondary" size="l">
        Flat secondary
    </UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button view="flat" size="l">Flat</Button>
<Button view="flat-info" size="l">Flat info</Button>
<Button view="flat-danger" size="l">Flat danger</Button>
<Button view="flat-secondary" size="l">Flat secondary</Button>
```

<!--/GITHUB_BLOCK-->

### Special

Buttons `normal-contrast`, `outline-contrast`, `flat-contrast` used to highlight actions against a complex background (for example, in a banner or against a color background).
The usage type depends on the required degree of display.

<!--LANDING_BLOCK
<ExampleBlock
    background='rgb(255, 190, 92)'
    code={`
<Button view="normal-contrast" size="l">Normal</Button>
<Button view="outlined-contrast" size="l">Outlined</Button>
<Button view="flat-contrast" size="l">Flat</Button>
`}
>
    <UIKit.Button view="normal-contrast" size="l">
        Normal
    </UIKit.Button>
    <UIKit.Button view="outlined-contrast" size="l">
        Outlined
    </UIKit.Button>
    <UIKit.Button view="flat-contrast" size="l">
        Flat
    </UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button view="normal-contrast" size="l">Normal</Button>
<Button view="outlined-contrast" size="l">Outlined</Button>
<Button view="flat-contrast" size="l">Flat</Button>
```

<!--/GITHUB_BLOCK-->

## Button text

The name of a button should uniquely identify what happens if you click it. If it's an action, it should answer the question "What does it do?".

- Button names should begin with a capital letter (Save, Rename, Create disk, or Add endpoint).
- Actions on a page or in a modal window should be consistent with their headers (such as Create virtual disk, Create, or Cancel).
- If it's a link, it should answer the question "What?" or "What does it do?".

## Icons

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Left
</Button>
<Button view="outlined" size="l">
    Right
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
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={18} />
        Left
    </UIKit.Button>
    <UIKit.Button view="outlined" size="l">
        Right
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={18} />
    </UIKit.Button>
    <UIKit.Button view="outlined" size="l">
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={18} />
        Both
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={18} />
    </UIKit.Button>
    <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
        <span>No text:</span>
        <UIKit.Button view="outlined" size="l">
            <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" class="yc-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={18} />
        </UIKit.Button>
    </div>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Left
</Button>
<Button view="outlined" size="l">
    Right
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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button size="l">Default</Button>
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
`}
>
    <UIKit.Button size="l">Default</UIKit.Button>
    <UIKit.Button size="l" disabled>
        Disabled
    </UIKit.Button>
    <UIKit.Button size="l" loading>
        Loading
    </UIKit.Button>
    <UIKit.Button size="l" selected>
        Selected
    </UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button size="l">Default</Button>
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
```

<!--/GITHUB_BLOCK-->

Default – The main state of a button that a user can interact with.
Disabled – The state when a button is unavailable for some reason.
Loading – The state when the user has performed an action and is waiting for a system response.
Selected – The state when the user can switch between "Enable" and "Disable".

## Size

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button size="xs">XS-size</Button>
<Button size="s">S-size</Button>
<Button size="m">M-size</Button>
<Button size="l">L-size</Button>
<Button size="xl">XL-size</Button>
`}
>
    <UIKit.Button size="xs">XS-size</UIKit.Button>
    <UIKit.Button size="s">S-size</UIKit.Button>
    <UIKit.Button size="m">M-size</UIKit.Button>
    <UIKit.Button size="l">L-size</UIKit.Button>
    <UIKit.Button size="xl">XL-size</UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button size="xs">XS-size</Button>
<Button size="s">S-size</Button>
<Button size="m">M-size</Button>
<Button size="l">L-size</Button>
<Button size="xl">XL-size</Button>
```

<!--/GITHUB_BLOCK-->

XS – Smallest size, used inside controls with size S

S – Used when standard buttons are too big (tables, small cards).

M – Basic size, used in most components.

L – Basic actions performed in a page's header, modal windows, or pop-ups.

XL – Used on promo and landing pages.

## Width

none - Standart mode

auto - Limits the maximum width of the component, hides overflowing content by ellipsis.

max - Fixes the width by the width of the parent, also hides overflowing content

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button>none</Button>
<Button>none none none</Button>
<Button width="auto">auto</Button>
<Button width="auto">auto auto auto</Button>
<Button width="max">max</Button>
<Button width="max">max max max</Button>
`}
>
    <div style={{width: 100, border: '2px dashed gray'}}>
        <p>
            <UIKit.Button>none</UIKit.Button>
        </p>
        <p>
            <UIKit.Button>none none none</UIKit.Button>
        </p>
        <p>
            <UIKit.Button width="auto">auto</UIKit.Button>
        </p>
        <p>
            <UIKit.Button width="auto">auto auto auto</UIKit.Button>
        </p>
        <p>
            <UIKit.Button width="max">max</UIKit.Button>
        </p>
        <p>
            <UIKit.Button width="max">max max max</UIKit.Button>
        </p>
    </div>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button>none</Button>
<Button>none none none</Button>
<Button width="auto">auto</Button>
<Button width="auto">auto auto auto</Button>
<Button width="max">max</Button>
<Button width="max">max max max</Button>
```

<!--/GITHUB_BLOCK-->

## Pin

That property allows you to controll right and left edges of button

Examples for right edge:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Button view="action" pin="brick-brick">
    brick-brick
</Button>
<Button view="action" pin="brick-round">
    brick-round
</Button>
<Button view="action" pin="brick-circle">
    brick-circle
</Button>
<Button view="outlined-info" pin="brick-clear">
    brick-clear
</Button>
`}
>
    <UIKit.Button view="action" pin="brick-brick">
        brick-brick
    </UIKit.Button>
    <UIKit.Button view="action" pin="brick-round">
        brick-round
    </UIKit.Button>
    <UIKit.Button view="action" pin="brick-circle">
        brick-circle
    </UIKit.Button>
    <UIKit.Button view="outlined-info" pin="brick-clear">
        brick-clear
    </UIKit.Button>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Button view="action" pin="brick-brick">
    brick-brick
</Button>
<Button view="action" pin="brick-round">
    brick-round
</Button>
<Button view="action" pin="brick-circle">
    brick-circle
</Button>
<Button view="outlined-info" pin="brick-clear">
    brick-clear
</Button>
```

<!--/GITHUB_BLOCK-->

Some combinations:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<div>
    <Button view="outlined-danger" pin="circle-clear">right</Button>
    <Button view="outlined-danger" pin="clear-circle">left</Button>
</div>
<div>
    <Button view="outlined-info" pin="round-clear">right</Button>
    <Button view="action" pin="brick-brick">center</Button>
    <Button view="outlined-info" pin="clear-round">left</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4+</Button>
</div>
`}
>
    <div>
        <UIKit.Button view="outlined-danger" pin="circle-clear">
            right
        </UIKit.Button>
        <UIKit.Button view="outlined-danger" pin="clear-circle">
            left
        </UIKit.Button>
    </div>
    <div>
        <UIKit.Button view="outlined-info" pin="round-clear">
            right
        </UIKit.Button>
        <UIKit.Button view="action" pin="brick-brick">
            center
        </UIKit.Button>
        <UIKit.Button view="outlined-info" pin="clear-round">
            left
        </UIKit.Button>
    </div>
    <div>
        <UIKit.Button view="outlined" pin="brick-clear">
            1
        </UIKit.Button>
        <UIKit.Button view="outlined" pin="clear-clear">
            2
        </UIKit.Button>
        <UIKit.Button view="outlined" pin="clear-clear">
            3
        </UIKit.Button>
        <UIKit.Button view="outlined" pin="clear-brick">
            4+
        </UIKit.Button>
    </div>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<div>
    <Button view="outlined-danger" pin="circle-clear">right</Button>
    <Button view="outlined-danger" pin="clear-circle">left</Button>
</div>
<div>
    <Button view="outlined-info" pin="round-clear">right</Button>
    <Button view="action" pin="brick-brick">center</Button>
    <Button view="outlined-info" pin="clear-round">left</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4+</Button>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name             | Description                                                                                                                                                                                                                           |                   Default                   |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-----------------------------------------: |
| **view**         | Button appearance: `"normal"` `"outlined"` `"action"` `"outlined-info"` `"outlined-danger"` `"raised"` `"flat"` `"flat-info"` `"flat-danger"` `"flat-secondary"` `"normal-contrast"` `"outlined-contrast"` `"flat-contrast"`          |                 `"normal"`                  |
| **size**         | `"xs"` `"s"` `"m"` `"l"` `"xl"`                                                                                                                                                                                                       |                    `"m"`                    |
| **pin**          | `"round-round"` `"brick-brick"` `"clear-clear"` `"round-brick"` `"brick-round"` `"round-clear"` `"clear-round"` `"brick-clear"` `"clear-brick"` `"circle-circle"` `"circle-brick"` `"brick-circle"` `"circle-clear"` `"clear-circle"` |               `"round-round"`               |
| **selected**     | `boolean`                                                                                                                                                                                                                             |                      -                      |
| **disabled**     | `boolean`                                                                                                                                                                                                                             |                   `false`                   |
| **loading**      | `boolean`                                                                                                                                                                                                                             |                   `false`                   |
| **width**        | `"auto"` `"max"`                                                                                                                                                                                                                      |                      -                      |
| **title**        | `string`                                                                                                                                                                                                                              |                      -                      |
| **tabIndex**     | `number`                                                                                                                                                                                                                              |                      -                      |
| **id**           | `string`                                                                                                                                                                                                                              |                      -                      |
| **type**         | `"button"` `"submit"` `"reset"`                                                                                                                                                                                                       |                 `"button"`                  |
| **component**    | `ElementType<any>`                                                                                                                                                                                                                    |                      -                      |
| **href**         | `string`                                                                                                                                                                                                                              |                      -                      |
| **target**       | `string`                                                                                                                                                                                                                              |                      -                      |
| **rel**          | `string`                                                                                                                                                                                                                              |                      -                      |
| **extraProps**   | `AnchorHTMLAttributes< HTMLAnchorElement >`                                                                                                                                                                                           | `ButtonHTMLAttributes< HTMLButtonElement >` |
| **onClick**      | `MouseEventHandler< HTMLAnchorElement \| HTMLButtonElement >`                                                                                                                                                                         |                      -                      |
| **onMouseEnter** | `MouseEventHandler< HTMLAnchorElement \| HTMLButtonElement >`                                                                                                                                                                         |                      -                      |
| **onMouseLeave** | `MouseEventHandler< HTMLAnchorElement \| HTMLButtonElement >`                                                                                                                                                                         |                      -                      |
| **onFocus**      | `FocusEventHandler< HTMLAnchorElement \| HTMLButtonElement >`                                                                                                                                                                         |                      -                      |
| **onBlur**       | `FocusEventHandler< HTMLAnchorElement \| HTMLButtonElement >`                                                                                                                                                                         |                      -                      |
| **children**     | Button content. You can mix button text with `<Icon/>` component `ReactNode`                                                                                                                                                          |                      -                      |
| **style**        | `CSSProperties`                                                                                                                                                                                                                       |                      -                      |
| **className**    | `string`                                                                                                                                                                                                                              |                      -                      |
| **qa**           | `string`                                                                                                                                                                                                                              |                      -                      |
