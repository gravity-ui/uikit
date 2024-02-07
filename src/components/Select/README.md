<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

```tsx
import {Select} from '@gravity-ui/uikit';
```

`Select` represents a control that provides a list of options that user can select.

## Options

Options to select.

### Defining options

You can define options as an array of objects or as the children of a component. The first approach is convenient for cases where options require complex preparation and possible memoization. The second approach is convenient when there are few options, and their configuration does not require complex calculations.

#### Flat list

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  options={[
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
  ]}
/>
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <div>
    Array of objects
    <UIKit.Select
      options={[
        {value: 'val_1', content: 'Value 1'},
        {value: 'val_2', content: 'Value 2'},
        {value: 'val_3', content: 'Value 3'},
        {value: 'val_4', content: 'Value 4'},
      ]}
    />
  </div>
  <div>
    Child nodes
    <UIKit.Select>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
// Array of objects
<Select
  options={[
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
  ]}
/>
// Child nodes
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

#### Grouped list

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
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
<Select>
  <Select.OptionGroup label="Group 1">
    <Select.Option value="val_1" content="Value 1" />
    <Select.Option value="val_2" content="Value 2" />
  </Select.OptionGroup>
  <Select.OptionGroup label="Group 2">
    <Select.Option value="val_3" content="Value 3" />
    <Select.Option value="val_4" content="Value 4" />
  </Select.OptionGroup>
</Select>
`}
>
  <div>
    Array of objects
    <UIKit.Select
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
  </div>
  <div>
    Child nodes
    <UIKit.Select>
      <UIKit.Select.OptionGroup label="Group 1">
        <UIKit.Select.Option value="val_1" content="Value 1" />
        <UIKit.Select.Option value="val_2" content="Value 2" />
      </UIKit.Select.OptionGroup>
      <UIKit.Select.OptionGroup label="Group 2">
        <UIKit.Select.Option value="val_3" content="Value 3" />
        <UIKit.Select.Option value="val_4" content="Value 4" />
      </UIKit.Select.OptionGroup>
    </UIKit.Select>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
// Array of objects
<Select
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
<Select>
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

You can define and store uniq data in each option by using `option.data` property. This can be useful when you need to enrich the data when using the `onUpdate` callback or, for example, when drawing your options with `renderOption`.

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

## Filtering options

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
  <UIKit.Select filterable={true} placeholder="Filterable">
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

To manage default contols and options sizes use the `size` property. Default value is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
  <UIKit.Select size="s" placeholder="S Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="m" placeholder="M Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="l" placeholder="L Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="xl" placeholder="XL Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

By default, the width of the control stretches to match the width of the content of the selected options. You can manage it by using `width` property:

`'max'` - stretches to the full width of the parent.

`number` - apply width in pixels.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select width="max">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select width={150}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <div style={{width: 150, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Default</h4>
    <UIKit.Select multiple={true}>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
  <div style={{width: 150, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Max</h4>
    <UIKit.Select width="max" multiple={true}>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
  <div style={{width: 150, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>In pixels</h4>
    <UIKit.Select width={110} multiple={true}>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

## Popup width

Popup width managed by the `popupWidth` property. Available values:

`'fit'` - apply control width.

`number` - apply width in pixels.

There are some points about default behaviour:

- The width of the popup is equal to the width of the widest option, but not wider than `90vw`. Does not work in case of using [virtualization](#virtualized-list).

- Narrow options are stretched to fit the width of the control.

<!--LANDING_BLOCK

### Non-virtualized list

A regular list when all the elements are in the dom tree at once.

<ExampleBlock
    code={`
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
`}
>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Default</h4>
    <p>
      <UIKit.Select placeholder="Short value">
        <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value">
        <UIKit.Select.Option value="val_1">Loooooooooooooooooooong Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Loooooooooooooooooooong Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Loooooooooooooooooooong Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Loooooooooooooooooooong Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
  </div>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Fit</h4>
    <p>
      <UIKit.Select placeholder="Short value" popupWidth="fit">
        <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value" popupWidth="fit">
        <UIKit.Select.Option value="val_1">Loooooooooooooooooooong Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Loooooooooooooooooooong Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Loooooooooooooooooooong Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Loooooooooooooooooooong Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
  </div>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>In pixels</h4>
    <p>
      <UIKit.Select placeholder="Short value" popupWidth={80}>
        <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value" popupWidth={80}>
        <UIKit.Select.Option value="val_1">Loooooooooooooooooooong Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Loooooooooooooooooooong Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Loooooooooooooooooooong Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Loooooooooooooooooooong Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

### Virtualized list

For optimal display of a large number of options, `Select` has a built-in list virtualization mechanism. Virtualization is enabled after overcoming the threshold of the number of options (`50` by default). You can control this value using the `virtualizationThreshold` property.

When using virtualization, some restrictions are imposed on the popup element:

- The popup width stops adjusting to the length of the longest option.

- The minimum width of the popup is equal to the width of the control, or `100px` if the control is shorter.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
`}
>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Default</h4>
    <p>
      <UIKit.Select placeholder="Short value">
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value">
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Loooooooooooooooooooong Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
  </div>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>In pixels</h4>
    <p>
      <UIKit.Select placeholder="Short value" popupWidth={80}>
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value" popupWidth={80}>
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Loooooooooooooooooooong Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

## Advanced usage

There are many ways to add uniqueness to your `Select`.

### Render custom control

To render custom control use the `renderControl` property.
Notice: you should forward all arguments to your node in order to have consistent behavior as in the case of using default control.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderControl={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Custom control</button>
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select renderControl={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Custom control</button>
  }}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
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

### Render custom filter section

To render custom filter section use the `renderFilter` property and set `filterable` property to `true`.
Notice: you should forward all arguments to your node in order to have properly working filter as in the case of using default.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  placeholder="Custom filter"
  filterable={true}
  renderFilter={({onChange, onKeyDown, ref, value}) => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <input
          ref={ref}
          value={value}
          size="1"
          onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
        />
        <button>Do smth</button>
      </div>
    );
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Custom filter"
    filterable={true}
    renderFilter={({onChange, onKeyDown, ref, value}) => {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <input
            ref={ref}
            value={value}
            size="1"
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
import {Button, TextInput} from '@gravity-ui/uikit';
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

### Render custom options

To render custom options use the `renderOption` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderOption={(option) => {
    return (
      <div style={{color: option.data.color}}>
        {option.children}
      </div>
    );
  }}
>
  <Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{color: '#534581'}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Custom options"
    renderOption={(option) => {
      return (
        <div style={{color: option.data.color}}>
          {option.children}
        </div>
      );
    }}
  >
    <UIKit.Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{color: '#534581'}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

### Render custom selected options

To render custom selected options use the `renderSelectedOption` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderSelectedOption={(option) => {
    return (
      <div style={{color: option.data.color}}>
        {option.children}
      </div>
    );
  }}
>
  <Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{color: '#534581'}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Custom selected options"
    renderSelectedOption={(option) => {
      return (
        <div style={{color: option.data.color}}>
          {option.children}
        </div>
      );
    }}
  >
    <UIKit.Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{color: '#534581'}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

### Render options with different heights

The options have a fixed height according to the `size` property. If you need to render options with different heights, you can use the `option.data` property, which will store information about what height you need to set the options and `getOptionHeight` property to set this value.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  getOptionHeight={(option) => option.data.height}
>
  <Select.Option value="val_1" data={{height: 20}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{height: 40}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{height: 60}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{height: 80}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Different heights"
    getOptionHeight={(option) => option.data.height}
  >
    <UIKit.Select.Option value="val_1" data={{height: 20}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{height: 40}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{height: 60}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{height: 80}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

### Render custom popup

To render custom popup use the `renderPopup` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  filterable
  renderSelectedOption={({renderList, renderFilter}) => {
    return (
      <React.Fragment>
        {renderFilter()}
        <div className="CustomElement" />
        {renderList()}
      </React.Fragment>
    );
  }}
>
  <Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{color: '#534581'}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    filterable
    placeholder="Custom selected options"
    renderSelectedOption={({renderList, renderFilter}) => {
      return (
        <React.Fragment>
          {renderFilter()}
          <div style={{width: "100%", height: "20px", backgroundColor: "tomato"}} />
          {renderList()}
        </React.Fragment>
      );
    }}
  >
    <UIKit.Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{color: '#534581'}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

The state of the `Select` in which you want to indicate incorrect user input. To change `Select` appearance, use the `validationState` property with the `"invalid"` value. An optional message text can be added via the `errorMessage` property. By default, message text is rendered outside the component.
This behaviour can be changed with the `errorPlacement` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Select placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
<Select placeholder="Placeholder" errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
`}
>
    <UIKit.Select placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
    <UIKit.Select placeholder="Placeholder" errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
</ExampleBlock>
LANDING_BLOCK-->

## Properties

| Name                                                      | Description                                                                                                                   | Type                                     | Default                                                  |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------- |
| className                                                 | Control className                                                                                                             | `string`                                 |                                                          |
| defaultValue                                              | Default values that represent selected options in case of using uncontrolled state                                            | `string[]`                               |                                                          |
| disabled                                                  | Indicates that the user cannot interact with the control                                                                      | `boolean`                                | `false`                                                  |
| [filterable](#filtering-options)                          | Indicates that select popup have filter section                                                                               | `boolean`                                | `false`                                                  |
| filterOption                                              | Used to compare option with filter                                                                                            | `function`                               |                                                          |
| filterPlaceholder                                         | Default filter input placeholder text                                                                                         | `string`                                 |                                                          |
| [getOptionHeight](#render-options-with-different-heights) | Used to set height of customized user options                                                                                 | `function`                               |                                                          |
| getOptionGroupHeight                                      | Used to set height of customized user option group                                                                            | `function`                               |                                                          |
| hasClear                                                  | Enable displaying icon for clear selected options                                                                             | `boolean`                                | `false`                                                  |
| id                                                        | HTML `id` attribute                                                                                                           | `string`                                 |                                                          |
| label                                                     | Control label                                                                                                                 | `string`                                 |                                                          |
| loading                                                   | Add the loading item to the end of the options list. Works like persistant loading indicator while the options list is empty. | `boolean`                                |                                                          |
| [multiple](#selecting-multiple-options)                   | Indicates that multiple options can be selected in the list                                                                   | `boolean`                                | `false`                                                  |
| name                                                      | Name of the control                                                                                                           | `string`                                 |                                                          |
| onBlur                                                    | Handler that is called when the element loses focus.                                                                          | `function`                               |                                                          |
| onFilterChange                                            | Fires every time after changing filter                                                                                        | `function`                               |                                                          |
| onFocus                                                   | Handler that is called when the element receives focus.                                                                       | `function`                               |                                                          |
| onLoadMore                                                | Fires when loading indicator gets visible.                                                                                    | `function`                               |                                                          |
| onOpenChange                                              | Fires every time after changing popup visibility                                                                              | `function`                               |                                                          |
| onUpdate                                                  | Fires when an alteration to the Select value is committed by the user                                                         | `function`                               |                                                          |
| [options](#options)                                       | Options to select                                                                                                             | `(SelectOption \| SelectOptionGroup)[]`  |                                                          |
| pin                                                       | Control border view                                                                                                           | `string`                                 | `'round-round'`                                          |
| placeholder                                               | Placeholder text                                                                                                              | `string`                                 |                                                          |
| popupClassName                                            | Popup with options list className                                                                                             | `string`                                 |                                                          |
| popupPlacement                                            | `Popper.js` placement                                                                                                         | `PopupPlacement` `Array<PopupPlacement>` | `['bottom-start', 'bottom-end', 'top-start', 'top-end']` |
| [popupWidth](#popup-width)                                | Popup width                                                                                                                   | `number \| 'fit' \| 'outfit'`            | `'outfit'`                                               |
| qa                                                        | Test id attribute (`data-qa`)                                                                                                 | `string`                                 |                                                          |
| [renderControl](#render-custom-control)                   | Used to render user control                                                                                                   | `function`                               |                                                          |
| renderEmptyOptions                                        | Used to render node for an empty options list                                                                                 | `function`                               |                                                          |
| [renderFilter](#render-custom-filter-section)             | Used to render user filter section                                                                                            | `function`                               |                                                          |
| [renderOption](#render-custom-options)                    | Used to render user options                                                                                                   | `function`                               |                                                          |
| renderOptionGroup                                         | Used to render user option groups                                                                                             | `function`                               |                                                          |
| [renderSelectedOption](#render-custom-selected-options)   | Used to render user selected options                                                                                          | `function`                               |                                                          |
| [renderPopup](#render-custom-popup)                       | Used to render user popup content                                                                                             | `function`                               |                                                          |
| [size](#size)                                             | Control / options size                                                                                                        | `string`                                 | `'m'`                                                    |
| value                                                     | Values that represent selected options                                                                                        | `string[]`                               |                                                          |
| view                                                      | Control view                                                                                                                  | `string`                                 | `'normal'`                                               |
| [virtualizationThreshold](#virtualized-list)              | The threshold of the options count after which virtualization is enabled                                                      | `number`                                 | `50`                                                     |
| [width](#control-width)                                   | Control width                                                                                                                 | `string \| number`                       | `undefined`                                              |
| errorMessage                                              | Error text                                                                                                                    | `string`                                 |                                                          |
| errorPlacement                                            | Error placement                                                                                                               | `outside` `inside`                       | `outside`                                                |
| validationState                                           | Validation state                                                                                                              | `"invalid"`                              |                                                          |

## CSS API

| Name                             | Description              |
| :------------------------------- | :----------------------- |
| `--g-select-outline-color-focus` | Outline color if focused |
