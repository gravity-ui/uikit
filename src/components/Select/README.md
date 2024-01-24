| Name                            | Type                                    | Default         | Description                                                                                                                                                                                                                                                                                                                        |
| :------------------------------ | :-------------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onUpdate                        | `function`                              | `-`             | Fires when an alteration to the Select value is committed by the user                                                                                                                                                                                                                                                              |
| onOpenChange                    | `function`                              | `-`             | Fires every time after changing popup visibility                                                                                                                                                                                                                                                                                   |
| onFilterChange                  | `function`                              | `-`             | Fires every time after changing filter                                                                                                                                                                                                                                                                                             |
| filterOption                    | `function`                              | `-`             | Used to compare option with filter                                                                                                                                                                                                                                                                                                 |
| [renderControl](#rendercontrol) | `function`                              | `-`             | Used to render user control                                                                                                                                                                                                                                                                                                        |
| [renderFilter](#renderfilter)   | `function`                              | `-`             | Used to render user filter section                                                                                                                                                                                                                                                                                                 |
| renderOption                    | `function`                              | `-`             | Used to render user options                                                                                                                                                                                                                                                                                                        |
| renderOptionGroup               | `function`                              | `-`             | Used to render user option groups                                                                                                                                                                                                                                                                                                  |
| renderSelectedOption            | `function`                              | `-`             | Used to render user selected options                                                                                                                                                                                                                                                                                               |
| renderEmptyOptions              | `function`                              | `-`             | Used to render node for an empty options list                                                                                                                                                                                                                                                                                      |
| getOptionHeight                 | `function`                              | `-`             | Used to set height of customized user options                                                                                                                                                                                                                                                                                      |
| getOptionGroupHeight            | `function`                              | `-`             | Used to set height of customized user option group                                                                                                                                                                                                                                                                                 |
| [options](#options)             | `(SelectOption \| SelectOptionGroup)[]` | `-`             | Options to select                                                                                                                                                                                                                                                                                                                  |
| view                            | `string`                                | `'normal'`      | Control [view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L4)                                                                                                                                                                                                                                 |
| size                            | `string`                                | `'m'`           | Control/options [size](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L6)                                                                                                                                                                                                                         |
| pin                             | `string`                                | `'round-round'` | Control [border view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L8)                                                                                                                                                                                                                          |
| width                           | `string \| number`                      | `undefined`     | Control width                                                                                                                                                                                                                                                                                                                      |
| popupWidth                      | `number \| 'fit' \| 'outfit'`           | `'outfit'`      | Popup width. fit - fit control width. outfit - apply width of widest option, 90vw or width of control if it wider than 90vw. Be ware! For a virtualized list the outfit mode does't work, the fit mode will be applied. Also, the virtualized list has a minimum popup width of 100px, short values will be stretched to this size |
| virtualizationThreshold         | `number`                                | `50`            | The threshold of the options count after which virtualization is enabled                                                                                                                                                                                                                                                           |
| name                            | `string`                                | `-`             | Name of the control                                                                                                                                                                                                                                                                                                                |
| className                       | `string`                                | `-`             | Control className                                                                                                                                                                                                                                                                                                                  |
| popupClassName                  | `string`                                | `-`             | Popup with options list className                                                                                                                                                                                                                                                                                                  |
| label                           | `string`                                | `-`             | Control label                                                                                                                                                                                                                                                                                                                      |
| placeholder                     | `string`                                | `-`             | Placeholder text                                                                                                                                                                                                                                                                                                                   |
| filterPlaceholder               | `string`                                | `-`             | Default filter input placeholder text                                                                                                                                                                                                                                                                                              |
| value                           | `string[]`                              | `-`             | Values that represent selected options                                                                                                                                                                                                                                                                                             |
| defaultValue                    | `string[]`                              | `-`             | Default values that represent selected options in case of using uncontrolled state                                                                                                                                                                                                                                                 |
| qa                              | `string`                                | `-`             | Test id attribute (`data-qa`)                                                                                                                                                                                                                                                                                                      |
| multiple                        | `boolean`                               | `false`         | Indicates that multiple options can be selected in the list                                                                                                                                                                                                                                                                        |
| filterable                      | `boolean`                               | `false`         | Indicates that select popup have filter section                                                                                                                                                                                                                                                                                    |
| disabled                        | `boolean`                               | `false`         | Indicates that the user cannot interact with the control                                                                                                                                                                                                                                                                           |
| hasClear                        | `boolean`                               | `false`         | Enable displaying icon for clear selected options                                                                                                                                                                                                                                                                                  |
| onFocus                         | `function`                              | `-`             | Handler that is called when the element receives focus.                                                                                                                                                                                                                                                                            |
| onBlur                          | `function`                              | `-`             | Handler that is called when the element loses focus.                                                                                                                                                                                                                                                                               |
| loading                         | `boolean`                               | `-`             | Add the loading item to the end of the options list. Works like persistant loading indicator while the options list is empty.                                                                                                                                                                                                      |
| onLoadMore                      | `function`                              | `-`             | Fires when loading indicator gets visible.                                                                                                                                                                                                                                                                                         |
| id                              | `string`                                | `-`             | HTML `id` attribute                                                                                                                                                                                                                                                                                                                |

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

## CSS API

| Name                                           | Description               |
| :--------------------------------------------- | :------------------------ |
| `--g-select-control-border-radius`             | Border radius             |
| `--g-select-control-text-color`                | Text color                |
| `--g-select-control-placeholder-color`         | Placeholder color         |
| `--g-select-control-disabled-background-color` | Disabled background color |
| `--g-select-control-disabled-text-color`       | Disabled text color       |
| `--g-select-control-border-color`              | Border color              |
| `--g-select-control-border-color-hover`        | Border color hovered      |
| `--g-select-control-border-color-active`       | Border color active       |
| `--g-select-control-border-width`              | Border width              |
| `--g-select-control-color-error`               | Error color               |
| `--g-select-control-chevron-icon-color`        | Color of arrow            |
