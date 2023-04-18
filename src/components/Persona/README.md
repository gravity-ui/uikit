# Persona

Component to display user or email.

## PropTypes

| Property     | Type                         | Required | Default   | Description                                                         |
| :----------- | :--------------------------- | :------: | :-------- | :------------------------------------------------------------------ |
| text         | `String`                     |   `+`    |           | Visible text                                                        |
| image        | `String`                     |          |           | Image source                                                        |
| theme        | `'default', 'clear'`         |          | `default` | Visual appearance (with or without border)                          |
| type         | `'person', 'email', 'empty'` |          | `person`  | Avatar appearance                                                   |
| size         | `'s', 'n'`                   |          | `s`       | Text size                                                           |
| onClose      | `(text: string) => void`     |          |           | Handle click on button with cross. Ignored, if `renderButton` used. |
| onClick      | `(text: string) => void`     |          |           | Handle click on component itself                                    |
| renderButton | `() => ReactNode`            |          |           | Render custom buttom                                                |
| className    | `String`                     |          |           | Custom CSS class for root element                                   |

## Examples

```jsx
const persona = <Persona text={defaultPerson} type={'person'} image={personImg} />;
```
