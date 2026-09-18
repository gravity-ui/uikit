<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

`Select` is a control that provides a list of options that a user can select.

```tsx
import {Select} from '@gravity-ui/uikit';
```

> [!NOTE]
> In v8 the options are drawn by the new list. What changed for a consumer is collected in the
> [migration guide](./migration-guide.md).

## Options

Options to select.

### Defining options

You can define options as an array of objects or as the children of a component. The first approach is useful for cases where options require complex preparation and, possibly, memorization. The second one is convenient when there are few options, and their configuration does not require complex calculations.

#### Flat list

<!--SANDBOX
import {Flex, Select} from '@gravity-ui/uikit';

const options = [
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
];

export default function () {
    return (
        <>
            <Flex gap={1} alignItems="center">
                Array of objects
                <Select placeholder="value" options={options} />
            </Flex>
            <Flex gap={1} alignItems="center">
                Child nodes
                <Select placeholder="value">
                    <Select.Option value="val_1">Value 1</Select.Option>
                    <Select.Option value="val_2">Value 2</Select.Option>
                    <Select.Option value="val_3">Value 3</Select.Option>
                    <Select.Option value="val_4">Value 4</Select.Option>
                </Select>
            </Flex>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
// Array of objects
<Select
  placeholder="value"
  options={[
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
  ]}
/>
// Child nodes
<Select placeholder="value">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

#### The text of an option

The text of an option is what the trigger shows for a selected option, what the filter matches and
what the search by the first letters looks up. By default it is the content of the option when that
is a string or a number, its children when those are, and its `value` otherwise — so an option that renders anything but a plain string needs
`getOptionText`, or it will be searched and named by its value.

<!--GITHUB_BLOCK-->

```tsx
import {Flex, Icon, Select, getSelectOptionText} from '@gravity-ui/uikit';

<Select
  options={cities}
  renderOption={(option) => (
    <Flex gap={1}>
      <Icon data={option.data.icon} />
      {option.data.name}
    </Flex>
  )}
  // The options of the list are not always the ones of a single shape: `getSelectOptionText` is
  // the default, so the ones without `data` keep the text they had
  getOptionText={(option) => option.data?.name ?? getSelectOptionText(option)}
/>;
```

<!--/GITHUB_BLOCK-->

`useSelectOptions` takes the same property: pass it there as well when the options are filtered
outside of the component. Define the function outside the component or memoize it — it takes part in
the memoization of the list, and a new function on every render rebuilds the rows.

`getOptionText` replaces the `text` property of an option, which is gone: the text of an option is
asked for rather than stored, so one function covers every option instead of a field repeated on
each of them.

The `value` of an option identifies its row, so the values have to be unique across the whole list,
groups included. The DOM `id` of the row is derived from it, and that id is what
`aria-activedescendant` of the trigger points at — read it from there rather than building it by
hand: the escaping of a value belongs to the list and is not a contract.

#### Grouped list

A group header is a caption rather than an option: it carries `role="presentation"`, stays out of
the keyboard walk and out of the count of `role="option"` rows, and describes the options under it
through `aria-describedby`. A group whose `label` is empty draws a separating line instead of a
header — as the first row of the list it has nothing to separate and takes no space at all. That is
the default drawing of a group: `renderOptionGroup` and `getOptionGroupHeight` are asked first and
render and measure whatever they like, empty label or not.

<!--SANDBOX
import {Flex, Select} from '@gravity-ui/uikit';

const groupedOptions = [
    {
        label: 'Group 1',
        options: [
            {value: 'val_1', content: 'Value 1'},
            {value: 'val_2', content: 'Value 2'},
        ],
    },
    {
        label: 'Group 2',
        options: [
            {value: 'val_3', content: 'Value 3'},
            {value: 'val_4', content: 'Value 4'},
        ],
    },
];

export default function () {
    return (
        <>
            <Flex gap={1} alignItems="center">
                Array of objects
                <Select placeholder="value" options={groupedOptions} />
            </Flex>
            <Flex gap={1} alignItems="center">
                Child nodes
                <Select placeholder="value">
                    <Select.OptionGroup label="Group 1">
                        <Select.Option value="val_1" content="Value 1" />
                        <Select.Option value="val_2" content="Value 2" />
                    </Select.OptionGroup>
                    <Select.OptionGroup label="Group 2">
                        <Select.Option value="val_3" content="Value 3" />
                        <Select.Option value="val_4" content="Value 4" />
                    </Select.OptionGroup>
                </Select>
            </Flex>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
// Array of objects
<Select
  placeholder="value"
  options={[
    {
      label: 'Group 1',
      options: [
        {value: 'val_1', content: 'Value 1'},
        {value: 'val_2', content: 'Value 2'},
      ],
    },
    {
      label: 'Group 2',
      options: [
        {value: 'val_3', content: 'Value 3'},
        {value: 'val_4', content: 'Value 4'},
      ],
    },
  ]}
/>
// Child nodes
<Select placeholder="value">
  <Select.OptionGroup label="Group 1">
    <Select.Option value="val_1" content="Value 1" />
    <Select.Option value="val_2" content="Value 2" />
  </Select.OptionGroup>
  <Select.OptionGroup label="Group 2">
    <Select.Option value="val_3" content="Value 3" />
    <Select.Option value="val_4" content="Value 4" />
  </Select.OptionGroup>
</Select>
```

<!--/GITHUB_BLOCK-->

### Storing data in options

You can define and store unique data in each option by using the `option.data` property. This can be useful when you need to enrich the data when using the `onUpdate` callback or, for example, when drawing your options with `renderOption`.

## Selecting multiple options

To enable multiple selection, use the `multiple` property. Its default value is `false`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select multiple placeholder="values">
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select multiple={true} placeholder="values">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

### Counter

You can add a counter of the selected items to the component using the `hasCounter` property.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select multiple hasCounter placeholder="values">
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select multiple={true} hasCounter={true} placeholder="values">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Filtering options

To enable filter section, use the `filterable` property. Its default value is `false`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select filterable placeholder="Filterable">
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select filterable={true} placeholder="Filterable">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## The search by the first letters

With the popup open and no filter in the way, the character keys look up an option: the list moves
the activity to the first option whose text **starts with** what was typed, the buffer resets a
second after the last key, and repeating one character cycles through the options that start with
it. A space belongs to the query while it is being typed, so a label with a space in it is
reachable — and it selects nothing until the buffer is empty again. A character the list took for
its search does not reach the hotkeys of the application around it.

In a `filterable` Select the keys go into the filter instead: typing there is filtering.

## Size

To manage the default control and option size, use the `size` property. Its default size is `m`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Select size="s" placeholder="S Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
            <Select size="m" placeholder="M Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
            <Select size="l" placeholder="L Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
            <Select size="xl" placeholder="XL Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select size="s" placeholder="S Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="m" placeholder="M Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="l" placeholder="L Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="xl" placeholder="XL Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Control width

By default, the control width stretches to match the width of the content of the selected options. You can manage it by using the `width` property:

`'max'`: Stretches to the full width of the parent.

`number`: Applies width in pixels.

<!--SANDBOX
import {Select, SelectProps} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 150,
    border: '2px dashed gray',
    textAlign: 'center',
};

function SelectExample(props: SelectProps) {
    return (
        <Select {...props}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4>Default</h4>
                <SelectExample multiple />
            </div>
            <div style={containerStyle}>
                <h4>Max</h4>
                <SelectExample width="max" multiple />
            </div>
            <div style={containerStyle}>
                <h4>In pixels</h4>
                <SelectExample width={110} multiple />
            </div>
        </>
    );
}
SANDBOX-->

## Popup width

You can manage the popup width with the `popupWidth` property. The available values are:

`'fit'`: Apply control width.

`number`: Apply width in pixels.

Points to note about the default behavior:

- The popup width is equal to the width of the widest option, but not wider than `90vw`. This does not apply in case you use [virtualization](#virtualized-list).

- Narrow options are stretched to fit the width of the control.

<!--SANDBOX
import {Box, Select, SelectProps} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 200,
    border: '2px dashed gray',
    textAlign: 'center',
};

function ShortValueSelect(props: SelectProps) {
    return (
        <Select placeholder="Short value" {...props}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}

function LongValueSelect(props: SelectProps) {
    return (
        <Select placeholder="Long value" {...props}>
            <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
            <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
            <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
            <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
        </Select>
    );
}

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4>Default</h4>
                <Box spacing={{my: 3}}>
                    <ShortValueSelect />
                </Box>
                <Box spacing={{my: 3}}>
                    <LongValueSelect />
                </Box>
            </div>
            <div style={containerStyle}>
                <h4>Fit</h4>
                <Box spacing={{my: 3}}>
                    <ShortValueSelect popupWidth="fit" />
                </Box>
                <Box spacing={{my: 3}}>
                    <LongValueSelect popupWidth="fit" />
                </Box>
            </div>
            <div style={containerStyle}>
                <h4>In pixels</h4>
                <Box spacing={{my: 3}}>
                    <ShortValueSelect popupWidth={80} />
                </Box>
                <Box spacing={{my: 3}}>
                    <LongValueSelect popupWidth={80} />
                </Box>
            </div>
        </>
    );
}
SANDBOX-->

## Virtualized list

A long list of options is rendered row by row unless you ask for otherwise: every option is a DOM row. To render only the visible ones, wrap the `Select` in `ListVirtualizer` from the `@gravity-ui/uikit/virtualizer` entry point — the wrapper needs no configuration, and the popup keeps working through the portal. A couple of hundred options is where it starts to pay off; above 150 the `Select` says so in a development warning.

The entry point needs `@tanstack/react-virtual`: it is an optional peer dependency of the package and has to be installed alongside it.

```tsx
import {Select} from '@gravity-ui/uikit';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

<ListVirtualizer>
  <Select options={thousandsOfOptions} />
</ListVirtualizer>;
```

Things to keep in mind:

- The popup width no longer gets adjusted to the length of the longest option.

- The minimum width of the popup is equal to the width of the control, or `100px` if the control is shorter.

- The height of a row before it is rendered is taken from [getOptionHeight](#rendering-options-with-different-heights) and the `size` of the `Select`; the `estimateItemSize` of the wrapper is not used, since the type of an option row does not leave the `Select` — passing it writes a warning in development. The `measure` and `overscan` properties of the wrapper work as [described](https://github.com/gravity-ui/uikit/blob/main/src/components/lab/List/README.md#virtualization) for the `List`.

- On the server the virtualizer does not know the size of the viewport and produces an empty window: the options appear after hydration.

- The wrapper covers the list of this `Select`, the one [renderPopup](#rendering-options-list) puts on the page included. A list inside a row of it, or a `Select` placed in such a row, renders every row of its own instead: the virtualization of a list does not reach what its rows draw.

- Define `getOptionHeight` and `renderOption` outside the component or memoize them: a new function on every render makes the virtualizer start its measurements over and the rows re-render.

<!--SANDBOX
import {Box, Select} from '@gravity-ui/uikit';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 200,
    border: '2px dashed gray',
    textAlign: 'center',
};

const shortOptions = Array.from({length: 1000}, (_, index) => ({
    value: String(index),
    content: `Value ${index}`,
}));

const longOptions = Array.from({length: 1000}, (_, index) => ({
    value: String(index),
    content: `Loooooooooooooooooooong Value ${index}`,
}));

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4>Default</h4>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Short value" options={shortOptions} />
                    </ListVirtualizer>
                </Box>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Long value" options={longOptions} />
                    </ListVirtualizer>
                </Box>
            </div>
            <div style={containerStyle}>
                <h4>In pixels</h4>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Short value" popupWidth={80} options={shortOptions} />
                    </ListVirtualizer>
                </Box>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Long value" popupWidth={80} options={longOptions} />
                    </ListVirtualizer>
                </Box>
            </div>
        </>
    );
}
SANDBOX-->

## Advanced usage

There are many ways to customize your `Select`.

### Rendering custom control

To render a custom control, use the `renderControl` property.

Hand `ref` to your element and spread `triggerProps` onto it: they open and close the popup, carry the keyboard of the list and the ARIA of the combobox (`role`, `aria-expanded`, `aria-controls`, `aria-activedescendant`). A control that keeps them to itself neither opens nor navigates. `disabled` comes beside them and belongs to your component directly — a wrapper usually writes its own to the element, over anything spread onto it.

<!--SANDBOX
import {Button, Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select
            renderControl={({ref, triggerProps, disabled}) => (
                <Button ref={ref} disabled={disabled} extraProps={triggerProps}>
                    Custom control
                </Button>
            )}
        >
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderControl: SelectProps['renderControl'] = ({ref, triggerProps, disabled}) => {
    // `triggerProps` opens and closes the popup and carries the keyboard of the list along with
    // the ARIA of the combobox — it has to reach the element itself. `disabled` goes to `Button`
    // rather than through `extraProps`: the component writes its own to the element last
    return (
      <Button ref={ref} disabled={disabled} extraProps={triggerProps}>
        Your control
      </Button>
    );
  };

  return <Select renderControl={renderControl}>/* Your options here */</Select>;
};
```

<!--/GITHUB_BLOCK-->

### Rendering custom filter section

To render a custom filter section, use the `renderFilter` property and set the `filterable` property to `true`.

`inputProps` carries everything the input of a combobox needs: the value, the handlers, the placeholder and the ARIA wiring — `role`, `aria-label`, `aria-controls`, `aria-activedescendant`, `aria-expanded`, `aria-autocomplete`. Without them the filter has no accessible name and names no active option for a screen reader. Spread it onto a plain `input` together with `ref`. A component that does not take a spread — `TextInput`, say — needs the parts handed over one by one, `onKeyDown` included: it carries the whole keyboard of the list.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Button, Flex, Select, TextInput} from '@gravity-ui/uikit';

const renderFilter: SelectProps['renderFilter'] = (props) => {
    const {ref, inputProps, onChange} = props;

    return (
        <Flex direction="column" gap={1}>
            <TextInput
                controlRef={ref}
                // `controlProps` reaches the input itself; `TextInput` owns the value, the
                // placeholder and the handlers, so those are given to it directly
                controlProps={{
                    size: 1,
                    role: inputProps.role,
                    'aria-label': inputProps['aria-label'],
                    'aria-controls': inputProps['aria-controls'],
                    'aria-activedescendant': inputProps['aria-activedescendant'],
                    'aria-expanded': inputProps['aria-expanded'],
                    'aria-autocomplete': inputProps['aria-autocomplete'],
                }}
                value={inputProps.value}
                placeholder={inputProps.placeholder}
                // `onChange` of `inputProps` is an event handler; `TextInput` gives a string, and
                // the argument of the same name is exactly that shape
                onUpdate={onChange}
                onKeyDown={inputProps.onKeyDown}
            />
            <Button size="xs">Do smth</Button>
        </Flex>
    );
};

export default function () {
    return (
        <Select placeholder="Custom filter" filterable renderFilter={renderFilter}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderFilter: SelectProps['renderFilter'] = (props) => {
    // `inputProps` carries the value, the handlers and the combobox wiring of the input
    const {ref, inputProps} = props;

    return (
      <div>
        <input ref={ref} {...inputProps} />
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

### Rendering custom options

To render custom options, use the `renderOption` property. It is called with the option and with the
state of its row: `isItemActive` — whether the row is the active one, the one `Enter` applies — and
`itemHeight`, the height the row comes out as, which is the one
[getOptionHeight](#rendering-options-with-different-heights) returned or the minimum of the
[size](#size). The check mark of a selected option in a [multiple](#selecting-multiple-options)
`Select` is drawn by the row itself, beside whatever this renders.

`renderOptionGroup` is the same for the header of a group: the group and `{isItemActive, itemHeight}`.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderOption: SelectProps['renderOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
};

export default function () {
    return (
        <Select placeholder="Custom options" renderOption={renderOption}>
            <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{color: '#38C0A8'}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{color: '#534581'}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderOption: SelectProps['renderOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
  };

  return (
    <Select renderOption={renderOption}>
      <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{color: '#38C0A8'}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{color: '#534581'}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Rendering custom selected options

To render custom selected options, use the `renderSelectedOption` property:

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderSelectedOption: SelectProps['renderSelectedOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
};

export default function () {
    return (
        <Select placeholder="Custom selected options" renderSelectedOption={renderSelectedOption}>
            <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{color: '#38C0A8'}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{color: '#534581'}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderSelectedOption: SelectProps['renderSelectedOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
  };

  return (
    <Select renderSelectedOption={renderSelectedOption}>
      <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{color: '#38C0A8'}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{color: '#534581'}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Rendering options with different heights

A row is as tall as its content, and no shorter than the minimum of its `size` (24, 28, 32 and 36 pixels; on mobile every row takes the 36 of `xl`) — unless you set the height yourself. If you need to render options with different heights, you can use the `option.data` property. It will store information about what height you need to set for the options, as well as the `getOptionHeight` property to set this value: the number it returns becomes the height of the row and the estimate the [virtualizer](#virtualized-list) positions the rows with.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const getOptionHeight: SelectProps['getOptionHeight'] = (option) => option.data.height;

export default function () {
    return (
        <Select placeholder="Different heights" getOptionHeight={getOptionHeight}>
            <Select.Option value="val_1" data={{height: 20}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{height: 40}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{height: 60}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{height: 80}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const getOptionHeight: SelectProps['getOptionHeight'] = (option) => option.data.height;

  return (
    <Select getOptionHeight={getOptionHeight}>
      <Select.Option value="val_1" data={{height: 20}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{height: 40}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{height: 60}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{height: 80}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Rendering custom counter

To render a custom counter, use the `renderCounter` property. The counter is only displayed when multiple selection is enabled (`multiple={true}`) and `hasCounter={true}`.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderCounter: SelectProps['renderCounter'] = (_, {count, disabled}) => {
    if (count === 0) {
        return null;
    }

    if (count >= 2) {
        return (
            <div
                style={{
                    padding: '0 8px',
                    color: disabled ? '#999' : '#027bf3',
                    fontWeight: 'bold',
                }}
            >
                +{count}
            </div>
        );
    }

    return count;
};

export default function () {
    return (
        <Select multiple hasCounter renderCounter={renderCounter}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderCounter: SelectProps['renderCounter'] = (_, {count, disabled}) => {
    if (count === 0) {
      return null;
    }
    if (count >= 2) {
      return (
        <div
          style={{
            padding: '0 8px',
            color: disabled ? '#999' : '#027bf3',
            fontWeight: 'bold',
          }}
        >
          +{count}
        </div>
      );
    }
    return count;
  };

  return (
    <Select multiple={true} hasCounter={true} renderCounter={renderCounter}>
      <Select.Option value="val_1">Value 1</Select.Option>
      <Select.Option value="val_2">Value 2</Select.Option>
      <Select.Option value="val_3">Value 3</Select.Option>
      <Select.Option value="val_4">Value 4</Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Rendering options list

The `renderPopup` property allows you to control the content of the options list: change the order of standard elements (filter, list), hide them, or add custom elements between, before, or after them.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderPopup: SelectProps['renderPopup'] = ({renderList, renderFilter}) => {
    return (
        <>
            {renderFilter()}
            <div style={{width: '100%', height: 20, backgroundColor: 'tomato'}} />
            {renderList()}
        </>
    );
};

export default function () {
    return (
        <Select filterable placeholder="Custom popup" renderPopup={renderPopup}>
            <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{color: '#38C0A8'}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{color: '#534581'}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const renderPopup: SelectProps['renderPopup'] = ({renderList, renderFilter}) => {
  return (
    <React.Fragment>
      {renderFilter()}
      <div className="CustomElement" />
      {renderList()}
    </React.Fragment>
  );
};

const MyComponent = () => {
  return (
    <Select filterable renderPopup={renderPopup}>
      <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{color: '#38C0A8'}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{color: '#534581'}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Error

This `Select` state is for incorrect user input. To change the `Select` appearance, use the `validationState` property with the `"invalid"` value. Optionally, you can provide an error message through the `errorMessage` property. By default, the message text is rendered outside the component.
You can change this with the `errorPlacement` property.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Select placeholder="Placeholder" errorMessage="Error message" validationState="invalid">
                <Select.Option value="val_1">Value 1</Select.Option>
                <Select.Option value="val_2">Value 2</Select.Option>
                <Select.Option value="val_3">Value 3</Select.Option>
                <Select.Option value="val_4">Value 4</Select.Option>
            </Select>
            <Select
                placeholder="Placeholder"
                errorPlacement="inside"
                errorMessage="Error message"
                validationState="invalid"
            >
                <Select.Option value="val_1">Value 1</Select.Option>
                <Select.Option value="val_2">Value 2</Select.Option>
                <Select.Option value="val_3">Value 3</Select.Option>
                <Select.Option value="val_4">Value 4</Select.Option>
            </Select>
        </>
    );
}
SANDBOX-->

## Properties

| Name                                                         | Description                                                                                                                      | Type                                     | Default                                                  |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------- |
| className                                                    | Control className                                                                                                                | `string`                                 |                                                          |
| defaultValue                                                 | Default values that represent selected options in case of using an uncontrolled state                                            | `string[]`                               |                                                          |
| disabled                                                     | Shows that the user cannot work with the control                                                                                 | `boolean`                                | `false`                                                  |
| [filterable](#filtering-options)                             | Shows that select popup has a filter section                                                                                     | `boolean`                                | `false`                                                  |
| filterOption                                                 | Used to compare option with filter                                                                                               | `function`                               |                                                          |
| filterPlaceholder                                            | Default filter input placeholder text                                                                                            | `string`                                 |                                                          |
| [getOptionText](#the-text-of-an-option)                      | The text of an option: the trigger, the filter and the search by the first letters use it                                        | `function`                               | string content, otherwise the value                      |
| [getOptionHeight](#rendering-options-with-different-heights) | Used to set height of customized user options                                                                                    | `function`                               |                                                          |
| getOptionGroupHeight                                         | Used to set height of customized user option group                                                                               | `function`                               |                                                          |
| hasClear                                                     | Enables displaying icon for clearing selected options                                                                            | `boolean`                                | `false`                                                  |
| id                                                           | `id` HTML attribute                                                                                                              | `string`                                 |                                                          |
| label                                                        | Control label                                                                                                                    | `string`                                 |                                                          |
| loading                                                      | Adds the loading item to the end of the option list. Works like a persistent loading indicator while the options list is empty.  | `boolean`                                |                                                          |
| [multiple](#selecting-multiple-options)                      | Shows whether multiple options can be selected in the list                                                                       | `boolean`                                | `false`                                                  |
| name                                                         | Name of the control                                                                                                              | `string`                                 |                                                          |
| onBlur                                                       | Handler that is called when the element loses focus.                                                                             | `function`                               |                                                          |
| filter                                                       | Controlled filter value                                                                                                          | `string`                                 | `''`                                                     |
| onFilterChange                                               | Fires every time after changing the filter                                                                                       | `function`                               |                                                          |
| onFocus                                                      | Handler that is called when the element gets focus                                                                               | `function`                               |                                                          |
| onLoadMore                                                   | Fires when the loading indicator gets visible                                                                                    | `function`                               |                                                          |
| onOpenChange                                                 | Fires every time after changing popup visibility                                                                                 | `function`                               |                                                          |
| onUpdate                                                     | Fires when an alteration to the `Select` value is committed by the user                                                          | `function`                               |                                                          |
| [options](#options)                                          | Options to select                                                                                                                | `(SelectOption \| SelectOptionGroup)[]`  |                                                          |
| pin                                                          | Control border view                                                                                                              | `string`                                 | `'round-round'`                                          |
| placeholder                                                  | Placeholder text                                                                                                                 | `string`                                 |                                                          |
| popupClassName                                               | Popup with the option list `className`                                                                                           | `string`                                 |                                                          |
| popupPlacement                                               | Popup placement                                                                                                                  | `PopupPlacement` `Array<PopupPlacement>` | `['bottom-start', 'bottom-end', 'top-start', 'top-end']` |
| [popupWidth](#popup-width)                                   | Popup width                                                                                                                      | `number \| 'fit'`                        |                                                          |
| sheetClassName                                               | Sheet's `className`                                                                                                              | `string`                                 |                                                          |
| qa                                                           | Test id attribute (`data-qa`)                                                                                                    | `string`                                 |                                                          |
| [renderControl](#rendering-custom-control)                   | Used to render user control                                                                                                      | `function`                               |                                                          |
| [renderCounter](#rendering-custom-counter)                   | Used to render user counter. Works only with [hasCounter](#counter).                                                             | `function`                               |                                                          |
| renderEmptyOptions                                           | Used to render a node for an empty option list                                                                                   | `function`                               |                                                          |
| [renderFilter](#rendering-custom-filter-section)             | Used to render user filter section                                                                                               | `function`                               |                                                          |
| [renderOption](#rendering-custom-options)                    | Used to render user options                                                                                                      | `function`                               |                                                          |
| renderOptionGroup                                            | Used to render user option groups                                                                                                | `function`                               |                                                          |
| [renderSelectedOption](#rendering-custom-selected-options)   | Used to render user selected options                                                                                             | `function`                               |                                                          |
| [renderPopup](#rendering-options-list)                       | Used to render options list content                                                                                              | `function`                               |                                                          |
| [size](#size)                                                | Control / options size                                                                                                           | `string`                                 | `'m'`                                                    |
| value                                                        | Values that represent selected options                                                                                           | `string[]`                               |                                                          |
| view                                                         | Control view                                                                                                                     | `string`                                 | `'normal'`                                               |
| [width](#control-width)                                      | Control width                                                                                                                    | `string \| number`                       | `undefined`                                              |
| errorMessage                                                 | Error text                                                                                                                       | `string`                                 |                                                          |
| errorPlacement                                               | Error position                                                                                                                   | `outside` `inside`                       | `outside`                                                |
| validationState                                              | Validation state                                                                                                                 | `"invalid"`                              |                                                          |
| [hasCounter](#counter)                                       | Shows the selected option count. The counter appears only when the [multiple](#selecting-multiple-options) selection is enabled. | `boolean`                                |                                                          |

## CSS API

The class names of the markup are not a public contract — the rows of the popup are rendered by the
list and its row view, and their markup changes with the kit. What is supported:

- the variables below;
- the colours of a row, through the `--g-list-item-view-background-color`,
  `--g-list-item-view-background-color-hover`, `--g-list-item-view-text-color` and
  `--g-list-item-view-description-color` variables of the row view. The geometry of a row — its
  height, padding and radius — follows the [size](#size) of the `Select` and is not overridable;
- the content of a row, through `renderOption`, `renderOptionGroup` and `renderSelectedOption`.

| Name                             | Description                                   |
| :------------------------------- | :-------------------------------------------- |
| `--g-select-focus-outline-color` | Outline color if focused (missing by default) |
