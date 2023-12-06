<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

```tsx
import {Select} from '@gravity-ui/uikit';
```

`Select` represents a control that provides a menu of options.

## Selecting multiple options

To enable multiple selection use the `multiple` property. Default to `false`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select multiple={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select multiple={true}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Select multiple={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Grouped options

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select>
  <Select.OptionGroup label="Group 1">
    <Select.Option value="val_1">Value 1</Select.Option>
    <Select.Option value="val_2">Value 2</Select.Option>
  </Select.OptionGroup>
  <Select.OptionGroup label="Group 2">
    <Select.Option value="val_3">Value 3</Select.Option>
    <Select.Option value="val_4">Value 4</Select.Option>
  </Select.OptionGroup>
</Select>
`}
>
  <UIKit.Select>
    <UIKit.Select.OptionGroup label="Group 1">
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    </UIKit.Select.OptionGroup>
    <UIKit.Select.OptionGroup label="Group 2">
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select.OptionGroup>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Select>
  <Select.OptionGroup label="Group 1">
    <Select.Option value="val_1">Value 1</Select.Option>
    <Select.Option value="val_2">Value 2</Select.Option>
  </Select.OptionGroup>
  <Select.OptionGroup label="Group 2">
    <Select.Option value="val_3">Value 3</Select.Option>
    <Select.Option value="val_4">Value 4</Select.Option>
  </Select.OptionGroup>
</Select>
```

<!--/GITHUB_BLOCK-->

## Filterable options

To enable filter section use the `filterable` property. Default to `false`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select filterable={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select filterable={true}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Select filterable={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Size

To control the size of the `Select` use the `size` property. Default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select size="s">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="m">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="l">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="xl">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
`}
>
  <UIKit.Select size="s">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="m">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="l">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="xl">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Select size="s">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="m">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="l">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="xl">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Render custom control

To render custom control use the `renderControl` property.
Notice: you should forward all arguments to your node in order to have consistent behavior as in the case of using default control.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderControl={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Control</button>
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
`}
>
  <UIKit.Select renderControl={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Control</button>
  }}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderControl: SelectProps['renderControl'] = ({onClick, onKeyDown, ref}) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        extraProps={{
          onKeyDown,
        }}
      >
        Your control
      </Button>
    );
  };

  return <Select renderControl={renderControl}>/* Your options here */</Select>;
};
```

<!--/GITHUB_BLOCK-->

## Render custom filter section

To render custom filter section use the `renderFilter` property.
Notice: you should forward all arguments to your node in order to have properly working filter as in the case of using default.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderFilter={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Control</button>
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
`}
>
  <UIKit.Select
    filterable={true}
    renderFilter={({onChange, onKeyDown, ref, value}) => {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <input
            ref={ref}
            value={value}
            onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
          />
          <button>Do smth</button>
        </div>
      );
    }}
  >
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import React from 'react';
import {Button, Select, TextInput} from '@gravity-ui/uikit';
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderFilter: SelectProps['renderFilter'] = (props) => {
    const {value, ref, onChange, onKeyDown} = props;

    return (
      <div>
        <TextInput
          controlRef={ref}
          controlProps={{size: 1}}
          value={value}
          onUpdate={onChange}
          onKeyDown={onKeyDown}
        />
        <Button>Do smth</Button>
      </div>
    );
  };

  return (
    <Select filterable={true} renderFilter={renderFilter}>
      /* Your options here */
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

| Name                    | Description                                                                                                                                                                                                                                                                                                                        | Type                                    | Default         |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :-------------- |
| onUpdate                | Fires when an alteration to the Select value is committed by the user                                                                                                                                                                                                                                                              | `function`                              |                 |
| onOpenChange            | Fires every time after changing popup visibility                                                                                                                                                                                                                                                                                   | `function`                              |                 |
| onFilterChange          | Fires every time after changing filter                                                                                                                                                                                                                                                                                             | `function`                              |                 |
| filterOption            | Used to compare option with filter                                                                                                                                                                                                                                                                                                 | `function`                              |                 |
| renderControl           | Used to render user control                                                                                                                                                                                                                                                                                                        | `function`                              |                 |
| renderFilter            | Used to render user filter section                                                                                                                                                                                                                                                                                                 | `function`                              |                 |
| renderOption            | Used to render user options                                                                                                                                                                                                                                                                                                        | `function`                              |                 |
| renderOptionGroup       | Used to render user option groups                                                                                                                                                                                                                                                                                                  | `function`                              |                 |
| renderSelectedOption    | Used to render user selected options                                                                                                                                                                                                                                                                                               | `function`                              |                 |
| renderEmptyOptions      | Used to render node for an empty options list                                                                                                                                                                                                                                                                                      | `function`                              |                 |
| getOptionHeight         | Used to set height of customized user options                                                                                                                                                                                                                                                                                      | `function`                              |                 |
| getOptionGroupHeight    | Used to set height of customized user option group                                                                                                                                                                                                                                                                                 | `function`                              |                 |
| options                 | Options to select                                                                                                                                                                                                                                                                                                                  | `(SelectOption \| SelectOptionGroup)[]` |                 |
| view                    | Control [view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L4)                                                                                                                                                                                                                                 | `string`                                | `'normal'`      |
| size                    | Control/options [size](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L6)                                                                                                                                                                                                                         | `string`                                | `'m'`           |
| pin                     | Control [border view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L8)                                                                                                                                                                                                                          | `string`                                | `'round-round'` |
| width                   | Control width                                                                                                                                                                                                                                                                                                                      | `string \| number`                      | `undefined`     |
| popupWidth              | Popup width. fit - fit control width. outfit - apply width of widest option, 90vw or width of control if it wider than 90vw. Be ware! For a virtualized list the outfit mode does't work, the fit mode will be applied. Also, the virtualized list has a minimum popup width of 100px, short values will be stretched to this size | `number \| 'fit' \| 'outfit'`           | `'outfit'`      |
| virtualizationThreshold | The threshold of the options count after which virtualization is enabled                                                                                                                                                                                                                                                           | `number`                                | `50`            |
| name                    | Name of the control                                                                                                                                                                                                                                                                                                                | `string`                                |                 |
| className               | Control className                                                                                                                                                                                                                                                                                                                  | `string`                                |                 |
| popupClassName          | Popup with options list className                                                                                                                                                                                                                                                                                                  | `string`                                |                 |
| label                   | Control label                                                                                                                                                                                                                                                                                                                      | `string`                                |                 |
| placeholder             | Placeholder text                                                                                                                                                                                                                                                                                                                   | `string`                                |                 |
| filterPlaceholder       | Default filter input placeholder text                                                                                                                                                                                                                                                                                              | `string`                                |                 |
| value                   | Values that represent selected options                                                                                                                                                                                                                                                                                             | `string[]`                              |                 |
| defaultValue            | Default values that represent selected options in case of using uncontrolled state                                                                                                                                                                                                                                                 | `string[]`                              |                 |
| qa                      | Test id attribute (`data-qa`)                                                                                                                                                                                                                                                                                                      | `string`                                |                 |
| multiple                | Indicates that multiple options can be selected in the list                                                                                                                                                                                                                                                                        | `boolean`                               | `false`         |
| filterable              | Indicates that select popup have filter section                                                                                                                                                                                                                                                                                    | `boolean`                               | `false`         |
| disabled                | Indicates that the user cannot interact with the control                                                                                                                                                                                                                                                                           | `boolean`                               | `false`         |
| hasClear                | Enable displaying icon for clear selected options                                                                                                                                                                                                                                                                                  | `boolean`                               | `false`         |
| onFocus                 | Handler that is called when the element receives focus.                                                                                                                                                                                                                                                                            | `function`                              |                 |
| onBlur                  | Handler that is called when the element loses focus.                                                                                                                                                                                                                                                                               | `function`                              |                 |
| loading                 | Add the loading item to the end of the options list. Works like persistant loading indicator while the options list is empty.                                                                                                                                                                                                      | `boolean`                               |                 |
| onLoadMore              | Fires when loading indicator gets visible.                                                                                                                                                                                                                                                                                         | `function`                              |                 |
| id                      | HTML `id` attribute                                                                                                                                                                                                                                                                                                                | `string`                                |                 |
