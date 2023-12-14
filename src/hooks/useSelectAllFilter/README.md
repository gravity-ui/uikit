# useSelectAllFilter

`useSelectAllFilter` allows you to quickly add "Select all" functionality to <Select> element.

## Пример использования

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

## Properties

| Name                     | Description                                                              | Type                               | Default            |
| :----------------------- | :----------------------------------------------------------------------- | :--------------------------------- | :----------------- | ------- | ------- | ------- |
| value                    | value of Select                                                          | `SelectProps["value"]`             |                    |
| options                  | options of Select                                                        | `SelectProps["options"]`           |
| onUpdate                 | onUpdate of Select                                                       | `SelectProps["onUpdate"]`          |
| filterPlaceholder        | filterPlaceholder of Select                                              | `SelectProps["filterPlaceholder"]` |                    |
| textInputProps           | Props that go to <TextInput> directly                                    | `TextInputProps`                   | `{hasClear: true}` |
| buttonProps              | Props that go to <Button> directly                                       | `ButtonProps`                      |                    |
| buttonPosition           | <Button> position relative to <TextInput>                                | `'up'                              | 'down'             | 'right' | 'left'` | `right` |
| containerClassname       | Classname of the div containing <Button> and <TextInput>                 | `string`                           |                    |
| selectAllButtonContent   | <Button> children when there are no selected options after filtration    | `ReactNode`                        |                    |
| deselectAllButtonContent | <Button> children when all options are selected after filtration         | `ReactNode`                        |                    |
| selectPartButtonContent  | <Button> children when part of the options are selected after filtration | `ReactNode`                        |                    |
