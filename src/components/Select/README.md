<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

```tsx
import {Select} from '@gravity-ui/uikit';
```

`Select` represents a control that provides a menu of options.

## Selecting multiple options

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

<!--/GITHUB_BLOCK-->

## Size

To control the size of the `Button` use the `size` property. Default size is `m`.

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
      <UIKit.Select.Option value="val_1">Value 1</Select.Option>
    </UIKit.Select>
    <UIKit.Select size="m">
      <UIKit.Select.Option value="val_1">Value 1</Select.Option>
    </UIKit.Select>
    <UIKit.Select size="l">
      <UIKit.Select.Option value="val_1">Value 1</Select.Option>
    </UIKit.Select>
    <UIKit.Select size="xl">
      <UIKit.Select.Option value="val_1">Value 1</Select.Option>
    </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Select size="s">S Size</Select>
<Select size="m">M Size</Select>
<Select size="l">L Size</Select>
<Select size="xl">XL Size</Select>
```

<!--/GITHUB_BLOCK-->

| Name                            | Description                                                                                                                                                                                                                                                                                                                        | Type                                    | Default         |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :-------------- |
| onUpdate                        | Fires when an alteration to the Select value is committed by the user                                                                                                                                                                                                                                                              | `function`                              |                 |
| onOpenChange                    | Fires every time after changing popup visibility                                                                                                                                                                                                                                                                                   | `function`                              |                 |
| onFilterChange                  | Fires every time after changing filter                                                                                                                                                                                                                                                                                             | `function`                              |                 |
| filterOption                    | Used to compare option with filter                                                                                                                                                                                                                                                                                                 | `function`                              |                 |
| [renderControl](#rendercontrol) | Used to render user control                                                                                                                                                                                                                                                                                                        | `function`                              |                 |
| [renderFilter](#renderfilter)   | Used to render user filter section                                                                                                                                                                                                                                                                                                 | `function`                              |                 |
| renderOption                    | Used to render user options                                                                                                                                                                                                                                                                                                        | `function`                              |                 |
| renderOptionGroup               | Used to render user option groups                                                                                                                                                                                                                                                                                                  | `function`                              |                 |
| renderSelectedOption            | Used to render user selected options                                                                                                                                                                                                                                                                                               | `function`                              |                 |
| renderEmptyOptions              | Used to render node for an empty options list                                                                                                                                                                                                                                                                                      | `function`                              |                 |
| getOptionHeight                 | Used to set height of customized user options                                                                                                                                                                                                                                                                                      | `function`                              |                 |
| getOptionGroupHeight            | Used to set height of customized user option group                                                                                                                                                                                                                                                                                 | `function`                              |                 |
| [options](#options)             | Options to select                                                                                                                                                                                                                                                                                                                  | `(SelectOption \| SelectOptionGroup)[]` |                 |
| view                            | Control [view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L4)                                                                                                                                                                                                                                 | `string`                                | `'normal'`      |
| size                            | Control/options [size](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L6)                                                                                                                                                                                                                         | `string`                                | `'m'`           |
| pin                             | Control [border view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L8)                                                                                                                                                                                                                          | `string`                                | `'round-round'` |
| width                           | Control width                                                                                                                                                                                                                                                                                                                      | `string \| number`                      | `undefined`     |
| popupWidth                      | Popup width. fit - fit control width. outfit - apply width of widest option, 90vw or width of control if it wider than 90vw. Be ware! For a virtualized list the outfit mode does't work, the fit mode will be applied. Also, the virtualized list has a minimum popup width of 100px, short values will be stretched to this size | `number \| 'fit' \| 'outfit'`           | `'outfit'`      |
| virtualizationThreshold         | The threshold of the options count after which virtualization is enabled                                                                                                                                                                                                                                                           | `number`                                | `50`            |
| name                            | Name of the control                                                                                                                                                                                                                                                                                                                | `string`                                |                 |
| className                       | Control className                                                                                                                                                                                                                                                                                                                  | `string`                                |                 |
| popupClassName                  | Popup with options list className                                                                                                                                                                                                                                                                                                  | `string`                                |                 |
| label                           | Control label                                                                                                                                                                                                                                                                                                                      | `string`                                |                 |
| placeholder                     | Placeholder text                                                                                                                                                                                                                                                                                                                   | `string`                                |                 |
| filterPlaceholder               | Default filter input placeholder text                                                                                                                                                                                                                                                                                              | `string`                                |                 |
| value                           | Values that represent selected options                                                                                                                                                                                                                                                                                             | `string[]`                              |                 |
| defaultValue                    | Default values that represent selected options in case of using uncontrolled state                                                                                                                                                                                                                                                 | `string[]`                              |                 |
| qa                              | Test id attribute (`data-qa`)                                                                                                                                                                                                                                                                                                      | `string`                                |                 |
| multiple                        | Indicates that multiple options can be selected in the list                                                                                                                                                                                                                                                                        | `boolean`                               | `false`         |
| filterable                      | Indicates that select popup have filter section                                                                                                                                                                                                                                                                                    | `boolean`                               | `false`         |
| disabled                        | Indicates that the user cannot interact with the control                                                                                                                                                                                                                                                                           | `boolean`                               | `false`         |
| hasClear                        | Enable displaying icon for clear selected options                                                                                                                                                                                                                                                                                  | `boolean`                               | `false`         |
| onFocus                         | Handler that is called when the element receives focus.                                                                                                                                                                                                                                                                            | `function`                              |                 |
| onBlur                          | Handler that is called when the element loses focus.                                                                                                                                                                                                                                                                               | `function`                              |                 |
| loading                         | Add the loading item to the end of the options list. Works like persistant loading indicator while the options list is empty.                                                                                                                                                                                                      | `boolean`                               |                 |
| onLoadMore                      | Fires when loading indicator gets visible.                                                                                                                                                                                                                                                                                         | `function`                              |                 |
| id                              | HTML `id` attribute                                                                                                                                                                                                                                                                                                                | `string`                                |                 |

---

#### Options

You can check `ControlGroupOption` [here](https://github.com/gravity-ui/uikit/blob/ba65eb4cac14d38f7babb5057bd3ab12c5bcbe33/src/components/types.ts#L45)

```typescript
type SelectOption = ControlGroupOption & {
  text?: string;
  data?: any;
};

type SelectOptionGroup = {
  label: string;
  options?: SelectOption[];
  children?:
    | React.ReactElement<SelectOption, typeof Option>
    | React.ReactElement<SelectOption, typeof Option>[];
};
```

#### renderControl

Notice: you should forward all arguments to your node in order to have consistent behavior as in the case of using default control

```tsx
import React from 'react';
import {Button, Select} from '@gravity-ui/uikit';

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

#### renderFilter

Notice: you should forward all arguments to your node in order to have properly working filter as in the case of using default

```tsx
import React from 'react';
import {Button, Select, TextInput} from '@gravity-ui/uikit';

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

  return <Select renderFilter={renderFilter}>/* Your options here */</Select>;
};
```
