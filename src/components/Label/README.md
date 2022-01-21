### PropTypes

| Property  | Type                                                       | Required | Default     | Description                                                     |
| :-------- | :--------------------------------------------------------- | :------- | :---------- | :-------------------------------------------------------------- | --- |
| theme     | `String`                                                   |          | `normal `   | Тема лейбла                                                     |
| type      | `String`                                                   |          | `default`   | Тип лейбла (обычный, с текстом для копирования или с крестиком) |
| size      | `String`                                                   |          | `xs`        | Размер лейбла                                                   |
| style     | `String`                                                   |          | `default`   | Стиль кнопки (с загруленными краями или обычная)                |     |
| tooltip   | `TooltipProps`                                             |          | `undefined` | Тултип лейбла                                                   |
| icon      | `ReactNode`                                                |          | `undefined` | Иконка лейбла (слева)                                           |
| disabled  | `Boolean`                                                  |          | `undefined` | Состояние disabled                                              |
| onClose   | `onClose?(event: React.MouseEvent<HTMLDivElement>): void;` |          | `undefined` | Хендлер на нажатие крестика                                     |
| copyText  | `String`                                                   |          | `undefined` | Текст для копирования                                           |
| onCopy    | `onCopy?(text: string, result: boolean): void;`            |          | `undefined` | Хендлер после события копирования                               |
| onClick   | `onClose?(event: React.MouseEvent<HTMLDivElement>): void;` |          | `undefined` | Хендлер на клик                                                 |
| className | `String`                                                   |          | `undefined` | Дополнительный класс                                            |
