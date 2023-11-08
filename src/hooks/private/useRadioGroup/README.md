# useRadioGroup

The `useRadioGroup` hook need to generate props for radio group control

## Properties

| Name         | Description       |                                              Type                                              | Default |
| :----------- | :---------------- | :--------------------------------------------------------------------------------------------: | :-----: |
| name         | Radio group name  |                                            `string`                                            |         |
| value        | Value             |                                            `string`                                            |         |
| defaultValue | Default value     |                                            `string`                                            |         |
| options      | Options           | `{value: string; content?: React.ReactNode; children?: React.ReactNode; disabled?: boolean}[]` |   []    |
| disabled     | Disabled flag     |                                           `boolean`                                            |         |
| onUpdate     | OnUpdate callback |                                   `(value: string) => void`                                    |         |
| onChange     | OnChange callback |                              `(event: React.ChangeEvent) => void`                              |         |
| onFocus      | OnFocus callback  |                              `(event: React.FocusEvent) => void`                               |         |
| onBlur       | OnBlur callback   |                              `(event: React.FocusEvent) => void`                               |         |

## Result

| Name           | Description                        |                                             Type                                             |
| :------------- | :--------------------------------- | :------------------------------------------------------------------------------------------: |
| containerProps | Props to pass to the input element | `{'aria-label'?: string;'aria-labelledby'?: string; role: string; 'aria-disabled': boolean;` |
| optionsProps   | Options props                      |                                        `OptionsProps`                                        |
