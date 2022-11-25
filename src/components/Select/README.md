| Property                        | Type                                    | Default         | Description                                                                                                |
| :------------------------------ | :-------------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------- |
| onUpdate                        | `function`                              | `-`             | Fires when an alteration to the Select value is committed by the user                                      |
| onOpenChange                    | `function`                              | `-`             | Fires every time after changing popup visibility                                                           |
| onFilterChange                  | `function`                              | `-`             | Fires every time after changing filter                                                                     |
| filterOption                    | `function`                              | `-`             | Used to compare option with filter                                                                         |
| [renderControl](#rendercontrol) | `function`                              | `-`             | Used to render user control                                                                                |
| [renderFilter](#renderfilter)   | `function`                              | `-`             | Used to render user filter section                                                                         |
| renderOption                    | `function`                              | `-`             | Used to render user options                                                                                |
| getOptionHeight                 | `function`                              | `-`             | Used to set height of customized user options                                                              |
| [options](#options)             | `(SelectOption \| SelectOptionGroup)[]` | `-`             | Options to select                                                                                          |
| view                            | `string`                                | `'normal'`      | Control [view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L4)         |
| size                            | `string`                                | `'m'`           | Control/options [size](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L6) |
| pin                             | `string`                                | `'round-round'` | Control [border view](https://github.com/gravity-ui/uikit/blob/main/src/components/TextInput/types.ts#L8)  |
| width                           | `string \| number`                      | `undefined`     | Control width                                                                                              |
| popupWidth                      | `number`                                | `-`             | Popup width                                                                                                |
| name                            | `string`                                | `-`             | Name of the control                                                                                        |
| className                       | `string`                                | `-`             | Control className                                                                                          |
| label                           | `string`                                | `-`             | Control label                                                                                              |
| placeholder                     | `string`                                | `-`             | Placeholder text                                                                                           |
| filterPlaceholder               | `string`                                | `-`             | Default filter input placeholder text                                                                      |
| value                           | `string[]`                              | `-`             | Values that represent selected options                                                                     |
| defaultValue                    | `string[]`                              | `-`             | Default values that represent selected options in case of using uncontrolled state                         |
| qa                              | `string`                                | `-`             | Test id attribute (`data-qa`)                                                                              |
| multiple                        | `boolean`                               | `false`         | Indicates that multiple options can be selected in the list                                                |
| filterable                      | `boolean`                               | `false`         | Indicates that select popup has filter section                                                             |
| disabled                        | `boolean`                               | `false`         | Indicates that the user cannot interact with the control                                                   |

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
