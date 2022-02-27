### PropTypes
| Property  | Type                                                       | Required | Default    | Description |
|:---       |:---                                                        |:---      |:---        |:---         |
| theme     | `String`                                                   |          | `normal `  | Theme of label |
| type      | `String`                                                   |          | `default`  | Type of label (regular, with copy of text or with close button) |
| size      | `String`                                                   |          | `xs`       | Size of label |
| style     | `String`                                                   |          | `default`  | Style of corners (regular or with rounded corners) | |
| tooltip   | `TooltipProps`                                             |          | `undefined` | Tooltip |
| icon      | `ReactNode`                                                |          | `undefined` | Left icon |
| disabled  | `Boolean`                                                  |          | `undefined` | disabled statement |
| onClose   | `onClose?(event: React.MouseEvent<HTMLDivElement>): void;` |          | `undefined` | Handler on close button click |
| copyText  | `String`                                                   |          | `undefined` | Text to be copied |
| onCopy    | `onCopy?(text: string, result: boolean): void;`            |          | `undefined` | Handler on copy button click |
| onClick   | `onClose?(event: React.MouseEvent<HTMLDivElement>): void;` |          | `undefined` | Handler on label click |
| className | `String`                                                   |          | `undefined` | ClassName of label |
| textClassName | `String`                                               |          | `undefined` | ClassName of label's text |
