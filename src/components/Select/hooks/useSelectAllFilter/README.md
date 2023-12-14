<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

```tsx
import {Select, useSelectAllFilter} from '@gravity-ui/uikit';
```

`useSelectAllFilter` allows you to quickly add "Select all" functionality to <Select> element.

## Пример использования

<!--GITHUB_BLOCK-->

```tsx
import {Select, useSelectAllFilter} from '@gravity-ui/uikit';

const MyComponent = () => {
  const selectOptions = [
    {value: 'value1', content: 'value1'},
    {value: 'value11', content: 'value11'},
    {value: 'value2', content: 'value2'},
    {value: 'value3', content: 'value3'},
  ];

  const [value, setValue] = React.useState<string[]>([]);

  const renderFilter = useSelectAllFilter({
    value: value,
    options: selectOptions,
    onUpdate: setValue,
    hasClear: true,
    autoFocus: true,
  });

  return (
    <Select
      filterable
      hasClear
      multiple
      renderFilter={renderFilter}
      value={value}
      placeholder={'Select options'}
      options={selectOptions}
      onUpdate={setValue}
    />
  );
};
```

<!--/GITHUB_BLOCK-->

## Properties

| Name              | Description                                        | Type                               | Default     |
| :---------------- | :------------------------------------------------- | :--------------------------------- | :---------- |
| value             | value of Select                                    | `SelectProps["value"]`             |             |
| options           | options of Select                                  | `SelectProps["options"]`           |
| onUpdate          | onUpdate of Select                                 | `SelectProps["onUpdate"]`          |
| filterPlaceholder | filterPlaceholder of Select                        | `SelectProps["filterPlaceholder"]` |             |
| hasClear          | Indicates that filter input has hasClear property  | `boolean`                          | `undefined` |
| autoFocus         | Indicates that filter input has autoFocus property | `boolean`                          | `undefined` |
