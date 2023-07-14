# Label

## PropTypes

| Property         | Type                                                          | Required | Default     | Description                                              |
| :--------------- | :------------------------------------------------------------ | :------- | :---------- | :------------------------------------------------------- |
| theme            | `String`                                                      |          | `normal `   | Label appearance                                         |
| type             | `String`                                                      |          | `default`   | Label type (plain, with text to copy or with cross icon) |
| size             | `String`                                                      |          | `xs`        | Label size                                               |
| tooltip          | `TooltipProps`                                                |          | `undefined` | Tooltip                                                  |
| icon             | `ReactNode`                                                   |          | `undefined` | Icon at the left                                         |
| disabled         | `Boolean`                                                     |          | `undefined` | Disabled state                                           |
| interactive      | `Boolean`                                                     |          | `undefined` | Display hover                                            |
| onClose          | `onClose?(event: React.MouseEvent<HTMLButtonElement>): void;` |          | `undefined` | Button with cross handler                                |
| copyText         | `String`                                                      |          | `undefined` | Text to copy                                             |
| closeButtonLabel | `String`                                                      |          | `undefined` | Text of `aria-label` of button with cross                |
| copyButtonLabel  | `String`                                                      |          | `undefined` | Text of `aria-label` of button with copy                 |
| onCopy           | `onCopy?(text: string, result: boolean): void;`               |          | `undefined` | Callback after copy                                      |
| onClick          | `onClick?(event: React.MouseEvent<HTMLDivElement>): void;`    |          | `undefined` | Handler for element click                                |
| className        | `String`                                                      |          | `undefined` | Class name                                               |

## Example

```tsx
<Label type="close" closeButtonLabel='Remove tag "Foobar"' onClose={removeTag}>
  Foobar
</Label>
```
