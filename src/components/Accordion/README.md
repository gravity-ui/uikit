<!--GITHUB_BLOCK-->

# Accordion

<!--/GITHUB_BLOCK-->

```tsx
import {Accordion} from '@gravity-ui/uikit';
```

The Accordion component allows you to create collapsible content panels where users can show or hide sections of information. This is useful for organizing large amounts of content in a compact way.

<!--GITHUB_BLOCK-->

## Base example

```tsx
<Accordion>
  <Accordion.Item summary="First Item">Content of the first item</Accordion.Item>
  <Accordion.Item summary="Second Item">Content of the second item</Accordion.Item>
  <Accordion.Item summary="Third Item">Content of the third item</Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Controlling state of accordion

You can control the accordion state using the `value` and `onUpdate` properties of the root component, or per item.

Example controlling state from the root component:

<!--SANDBOX
import {useState} from 'react';
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    const [value, setValue] = useState<string | null>('item1');

    return (
        <Accordion value={value} onUpdate={setValue}>
            <Accordion.Item summary="Settings" value="item1">
                Configure your application settings
            </Accordion.Item>
            <Accordion.Item summary="Notifications" value="item2">
                Manage notification preferences
            </Accordion.Item>
        </Accordion>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledAccordion() {
  const [value, setValue] = React.useState('item1');

  return (
    <Accordion value={value} onUpdate={setValue}>
      <Accordion.Item summary="Settings" value="item1">
        Configure your application settings
      </Accordion.Item>
      <Accordion.Item summary="Notifications" value="item2">
        Manage notification preferences
      </Accordion.Item>
    </Accordion>
  );
}
```

<!--/GITHUB_BLOCK-->

Example controlling state per item by the expanded prop:

<!--SANDBOX
import {useState} from 'react';
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    const [item1, setItem1] = useState(true);
    const [item2, setItem2] = useState(false);

    return (
        <Accordion>
            <Accordion.Item
                summary="Settings"
                onUpdate={setItem1}
                value="item1"
                expanded={item1}
            >
                Configure your application settings
            </Accordion.Item>
            <Accordion.Item
                summary="Notifications"
                onUpdate={setItem2}
                value="item2"
                expanded={item2}
            >
                Manage notification preferences
            </Accordion.Item>
        </Accordion>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledAccordion() {
  const [item1, setItem1] = React.useState(true);
  const [item2, setItem2] = React.useState(false);
  return (
    <Accordion>
      <Accordion.Item summary="Settings" onUpdate={setItem1} value="item1" expanded={item1}>
        Configure your application settings
      </Accordion.Item>
      <Accordion.Item summary="Notifications" onUpdate={setItem2} value="item2" expanded={item2}>
        Manage notification preferences
      </Accordion.Item>
    </Accordion>
  );
}
```

<!--/GITHUB_BLOCK-->

## Size

Use the `size` property to control the `Accordion` size. The default size is `m`.

<!--SANDBOX
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Accordion size="m">
                <Accordion.Item summary="Medium Size">Content for medium accordion</Accordion.Item>
            </Accordion>
            <Accordion size="l">
                <Accordion.Item summary="Large Size">Content for large accordion</Accordion.Item>
            </Accordion>
            <Accordion size="xl">
                <Accordion.Item summary="Extra Large Size">
                    Content for extra large accordion
                </Accordion.Item>
            </Accordion>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion size="m">
    <Accordion.Item summary="Medium Size">
        Content for medium accordion
    </Accordion.Item>
</Accordion>
<Accordion size="l">
    <Accordion.Item summary="Large Size">
        Content for large accordion
    </Accordion.Item>
</Accordion>
<Accordion size="xl">
    <Accordion.Item summary="Extra Large Size">
        Content for extra large accordion
    </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## View

`solid`: Main view with background (used by default).

`top-bottom`: View with top and bottom borders.

<!--SANDBOX
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Accordion view="solid">
                <Accordion.Item summary="Solid View">Content with solid background</Accordion.Item>
                <Accordion.Item summary="Another Item">More content</Accordion.Item>
            </Accordion>
            <Accordion view="top-bottom">
                <Accordion.Item summary="Top-Bottom View">
                    Content with top-bottom borders
                </Accordion.Item>
                <Accordion.Item summary="Another Item">More content</Accordion.Item>
            </Accordion>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion view="solid">
    <Accordion.Item summary="Solid View">
        Content with solid background
    </Accordion.Item>
    <Accordion.Item summary="Another Item">
        More content
    </Accordion.Item>
</Accordion>
<Accordion view="top-bottom">
    <Accordion.Item summary="Top-Bottom View">
        Content with top-bottom borders
    </Accordion.Item>
    <Accordion.Item summary="Another Item">
        More content
    </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Arrow Position

`end`: Arrow is positioned at the end of the header (used by default).

`start`: Arrow is positioned at the start of the header.

<!--SANDBOX
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Accordion arrowPosition="end">
                <Accordion.Item summary="Arrow at End">Content with arrow at the end</Accordion.Item>
            </Accordion>
            <Accordion arrowPosition="start">
                <Accordion.Item summary="Arrow at Start">
                    Content with arrow at the start
                </Accordion.Item>
            </Accordion>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion arrowPosition="end">
    <Accordion.Item summary="Arrow at End">
        Content with arrow at the end
    </Accordion.Item>
</Accordion>
<Accordion arrowPosition="start">
    <Accordion.Item summary="Arrow at Start">
        Content with arrow at the start
    </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Multiple

The `multiple` property allows multiple accordion items to be expanded simultaneously.

<!--SANDBOX
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    return (
        <Accordion multiple>
            <Accordion.Item summary="First Item">Content of the first item</Accordion.Item>
            <Accordion.Item summary="Second Item">Content of the second item</Accordion.Item>
            <Accordion.Item summary="Third Item">Content of the third item</Accordion.Item>
        </Accordion>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion multiple>
  <Accordion.Item summary="First Item">Content of the first item</Accordion.Item>
  <Accordion.Item summary="Second Item">Content of the second item</Accordion.Item>
  <Accordion.Item summary="Third Item">Content of the third item</Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Custom Summary

Use the `Accordion.Summary` component to create a custom header.

<!--SANDBOX
import {Accordion, Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <Accordion>
            <Accordion.Item value="custom">
                <Accordion.Summary>
                    {(props) => (
                        <Button {...props} view="flat" width="max">
                            Custom Summary Button
                        </Button>
                    )}
                </Accordion.Summary>
                Content with custom summary component
            </Accordion.Item>
            <Accordion.Item summary="Regular Summary">
                Content with regular summary prop
            </Accordion.Item>
        </Accordion>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion>
  <Accordion.Item value="custom">
    <Accordion.Summary>
      {(props) => (
        <Button {...props} view="flat" width="max">
          <Icon data={Settings} size={16} />
          Custom Summary Button
        </Button>
      )}
    </Accordion.Summary>
    Content with custom summary component
  </Accordion.Item>
  <Accordion.Item summary="Regular Summary">Content with regular summary prop</Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Disabled State

Individual accordion items can be disabled using the `disabled` property.

<!--SANDBOX
import {Accordion} from '@gravity-ui/uikit';

export default function () {
    return (
        <Accordion>
            <Accordion.Item summary="Active Item">
                This item is active and can be expanded
            </Accordion.Item>
            <Accordion.Item summary="Disabled Item" disabled>
                This item is disabled and cannot be expanded
            </Accordion.Item>
        </Accordion>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion>
  <Accordion.Item summary="Active Item">This item is active and can be expanded</Accordion.Item>
  <Accordion.Item summary="Disabled Item" disabled>
    This item is disabled and cannot be expanded
  </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Properties

### Accordion

| Name          | Description                                        |              Type               |  Default  |
| :------------ | :------------------------------------------------- | :-----------------------------: | :-------: |
| size          | Accordion size                                     |       `"m"` `"l"` `"xl"`        |   `"m"`   |
| view          | Accordion appearance                               |    `"solid"` `"top-bottom"`     | `"solid"` |
| multiple      | Allow multiple items to be expanded simultaneously |            `boolean`            |  `false`  |
| arrowPosition | Arrow indicator position                           |        `"start"` `"end"`        |  `"end"`  |
| defaultValue  | Default value for uncontrolled state               | `string` `string[]` `undefined` |           |
| value         | Current value for controlled state                 | `string` `string[]` `undefined` |           |
| onUpdate      | Callback function called when state changes        |           `Function`            |           |
| ariaLevel     | Heading level for accessibility                    |            `number`             |    `3`    |
| className     | CSS class name                                     |            `string`             |           |
| qa            | HTML `data-qa` attribute, used for testing         |            `string`             |           |

### Accordion.Item

| Name            | Description                                      |       Type        | Default |
| :-------------- | :----------------------------------------------- | :---------------: | :-----: |
| value           | Unique identifier for the item                   |     `string`      |         |
| summary         | Accordion item header                            | `React.ReactNode` |         |
| expanded        | Controlled expanded state                        |     `boolean`     |         |
| defaultExpanded | Default expanded state                           |     `boolean`     |         |
| disabled        | Disables the accordion item                      |     `boolean`     | `false` |
| keepMounted     | Keep content in DOM even when collapsed          |     `boolean`     |         |
| onUpdate        | Callback function called when item state changes |    `Function`     |         |
| className       | CSS class name                                   |     `string`      |         |
| qa              | HTML `data-qa` attribute, used for testing       |     `string`      |         |

### Accordion.Summary

| Name     | Description                                                                             |                      Type                       |                                          Default                                          |
| :------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------: | :---------------------------------------------------------------------------------------: |
| children | Custom summary render function                                                          | `(props, defaultSummary) => React.ReactElement` |                                                                                           |
| qa       | HTML `data-qa` attribute, used for testing. Works only if `qa` passed in Accordion.Item |                    `string`                     | `${accordion-item}-summary` if `qa` passed in Accordion.Item, `disclosure-summary` if not |

## CSS API

| Name                           | Description                               |
| :----------------------------- | :---------------------------------------- |
| `--g-accordion-padding-inline` | Inline (horizontal) padding for accordion |
