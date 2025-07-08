<!--GITHUB_BLOCK-->

# Accordion

<!--/GITHUB_BLOCK-->

```tsx
import {Accordion} from '@gravity-ui/uikit';
```

The Accordion component allows you to create collapsible content panels where users can show or hide sections of information. This is useful for organizing large amounts of content in a compact way.

## Size

Use the `size` property to control the `Accordion` size. The default size is `m`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion size="s">
    <Accordion.Item summary="Small Size">
        Content for small accordion
    </Accordion.Item>
</Accordion>
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
`}>
    <UIKit.Accordion size="s">
        <UIKit.Accordion.Item summary="Small Size">
            Content for small accordion
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="m">
        <UIKit.Accordion.Item summary="Medium Size">
            Content for medium accordion
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="l">
        <UIKit.Accordion.Item summary="Large Size">
            Content for large accordion
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="xl">
        <UIKit.Accordion.Item summary="Extra Large Size">
            Content for extra large accordion
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion size="s">
    <Accordion.Item summary="Small Size">
        Content for small accordion
    </Accordion.Item>
</Accordion>
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
            Content with solid background
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Another Item">
            More content
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion view="top-bottom">
        <UIKit.Accordion.Item summary="Top-Bottom View">
            Content with top-bottom borders
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Another Item">
            More content
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
            Content with arrow at the end
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion arrowPosition="start">
        <UIKit.Accordion.Item summary="Arrow at Start">
            Content with arrow at the start
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
            Content of the first item
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Second Item">
            Content of the second item
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Third Item">
            Content of the third item
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

## Controlled State

You can control the accordion state using the `value` and `onUpdate` properties.

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
            Configure your application settings
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Notifications" value="item2">
            Manage notification preferences
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
            Content with custom summary component
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Regular Summary">
            Content with regular summary prop
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
            This item is active and can be expanded
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Disabled Item" disabled>
            This item is disabled and cannot be expanded
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
| size          | Accordion size                                     |    `"s"` `"m"` `"l"` `"xl"`     |   `"m"`   |
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
