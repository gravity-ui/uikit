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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
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
`}>
    <UIKit.Accordion defaultValue="item1">
        <UIKit.Accordion.Item summary="Settings" value="item1">
            <UIKit.Text>Configure your application settings</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Notifications" value="item2">
            <UIKit.Text>Manage notification preferences</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
function ControlledAccordion() {
    const [item1, setItem1] = React.useState(true);
    const [item2, setItem2] = React.useState(false);
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
`}>
    <UIKit.Accordion defaultValue="item1">
        <UIKit.Accordion.Item summary="Settings" value="item1">
            <UIKit.Text>Configure your application settings</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Notifications" value="item2">
            <UIKit.Text>Manage notification preferences</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock>
    <UIKit.Accordion size="m">
        <UIKit.Accordion.Item summary="Medium Size">
            <UIKit.Text>Content for medium accordion</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="l">
        <UIKit.Accordion.Item summary="Large Size">
            <UIKit.Text>Content for large accordion</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="xl">
        <UIKit.Accordion.Item summary="Extra Large Size">
            <UIKit.Text>Content for extra large accordion</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
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
`}>
    <UIKit.Accordion view="solid">
        <UIKit.Accordion.Item summary="Solid View">
            <UIKit.Text>Content with solid background</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Another Item">
            <UIKit.Text>More content</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion view="top-bottom">
        <UIKit.Accordion.Item summary="Top-Bottom View">
            <UIKit.Text>Content with top-bottom borders</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Another Item">
            <UIKit.Text>More content</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
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
`}>
    <UIKit.Accordion arrowPosition="end">
        <UIKit.Accordion.Item summary="Arrow at End">
            <UIKit.Text>Content with arrow at the end</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion arrowPosition="start">
        <UIKit.Accordion.Item summary="Arrow at Start">
            <UIKit.Text>Content with arrow at the start</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion multiple>
    <Accordion.Item summary="First Item">
        Content of the first item
    </Accordion.Item>
    <Accordion.Item summary="Second Item">
        Content of the second item
    </Accordion.Item>
    <Accordion.Item summary="Third Item">
        Content of the third item
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion multiple>
        <UIKit.Accordion.Item summary="First Item">
            <UIKit.Text>Content of the first item</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Second Item">
            <UIKit.Text>Content of the second item</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Third Item">
            <UIKit.Text>Content of the third item</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
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
    <Accordion.Item summary="Regular Summary">
        Content with regular summary prop
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion>
        <UIKit.Accordion.Item value="custom">
            <UIKit.Accordion.Summary>
                {(props) => (
                    <UIKit.Button {...props} view="flat" width="max">
                        Custom Summary Button
                    </UIKit.Button>
                )}
            </UIKit.Accordion.Summary>
            <UIKit.Text>Content with custom summary component</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Regular Summary">
            <UIKit.Text>Content with regular summary prop</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion>
    <Accordion.Item summary="Active Item">
        This item is active and can be expanded
    </Accordion.Item>
    <Accordion.Item summary="Disabled Item" disabled>
        This item is disabled and cannot be expanded
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion>
        <UIKit.Accordion.Item summary="Active Item">
            <UIKit.Text>This item is active and can be expanded</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Disabled Item" disabled>
            <UIKit.Text>This item is disabled and cannot be expanded</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

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
