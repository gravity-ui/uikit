# Persona

Component to display user or email.

## PropTypes

| Property  | Type                         | Required | Default   | Description                                |
| :-------- | :--------------------------- | :------: | :-------- | :----------------------------------------- |
| text      | `String`                     |   `+`    |           | Visible text                               |
| image     | `String`                     |          |           | Image source                               |
| view      | `'default', 'clear'`         |          | `default` | Visual appearance (with or without border) |
| type      | `'person', 'email', 'empty'` |          | `person`  | Avatar appearance                          |
| size      | `'s', 'n'`                   |          | `s`       | Text size                                  |
| onClose   | `(text: string) => void`     |          |           | Handle click on button with cross          |
| onClick   | `(text: string) => void`     |          |           | Handle click on component itself           |
| className | `String`                     |          |           | Custom CSS class for root element          |

## Examples

```jsx
const persona = <Persona text={defaultPerson} type={'person'} image={personImg} />;
```
