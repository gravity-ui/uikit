### PropTypes

| Property  | Type                                                       | Required | Default     | Description                                              |
| :-------- | :--------------------------------------------------------- | :------- | :---------- | :------------------------------------------------------- |
| theme     | `String`                                                   |          | `normal `   | Label appearance                                         |
| type      | `String`                                                   |          | `default`   | Label type (plain, with text to copy or with cross icon) |
| size      | `String`                                                   |          | `xs`        | Label size                                               |
| style     | `String`                                                   |          | `default`   | Button style (default or rounded corners)                |
| tooltip   | `TooltipProps`                                             |          | `undefined` | Tooltip                                                  |
| icon      | `ReactNode`                                                |          | `undefined` | Icon at the left                                         |
| disabled  | `Boolean`                                                  |          | `undefined` | disabled state                                           |
| onClose   | `onClose?(event: React.MouseEvent<HTMLDivElement>): void;` |          | `undefined` | Button with cross handler                                |
| copyText  | `String`                                                   |          | `undefined` | Text to copy                                             |
| onCopy    | `onCopy?(text: string, result: boolean): void;`            |          | `undefined` | Callback after copy                                      |
| onClick   | `onClose?(event: React.MouseEvent<HTMLDivElement>): void;` |          | `undefined` | Handler for element click                                |
| className | `String`                                                   |          | `undefined` | Class name                                               |
