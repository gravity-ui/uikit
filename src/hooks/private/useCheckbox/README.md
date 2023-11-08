# useCheckbox

The `useCheckbox` hook need to generate props for checkbox control

## Properties

| Name           | Description                 |                                                                            Type                                                                            | Default |
| :------------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: |
| name           | Name                        |                                                                          `string`                                                                          |         |
| value          | Value                       |                                                                          `string`                                                                          |         |
| checked        | Checked flag                |                                                                         `boolean`                                                                          |         |
| defaultChecked | Default checked value       |                                                                         `boolean`                                                                          |         |
| indeterminate  | Indeterminate flag          |                                                                         `boolean`                                                                          |         |
| controlRef     | Ref-link on control element |                                                                        `React.Ref`                                                                         |         |
| controlProps   | Another control props       | `Omit<React.InputHTMLAttributes, 'name', 'value', 'id', 'onFocus', 'onBlur', 'disabled', 'type', 'onChange', 'defaultChecked', 'checked', 'aria-checked'>` |         |
| disabled       | Disabled flag               |                                                                         `boolean`                                                                          |         |
| onUpdate       | OnUpdate callback           |                                                                `(checked: boolean) => void`                                                                |         |
| onChange       | OnChange callback           |                                                            `(event: React.ChangeEvent) => void`                                                            |         |
| onFocus        | OnFocus callback            |                                                            `(event: React.FocusEvent) => void`                                                             |         |
| onBlur         | OnBlur callback             |                                                            `(event: React.FocusEvent) => void`                                                             |         |
| id             | ID attribute                |                                                            `(event: React.FocusEvent) => void`                                                             |         |

## Result

| Name       | Description                        |                       Type                        |
| :--------- | :--------------------------------- | :-----------------------------------------------: |
| checked    | Checked state                      |                     `boolean`                     |
| inputProps | Props to pass to the input element | `React.InputHTMLAttributes & React.RefAttributes` |
