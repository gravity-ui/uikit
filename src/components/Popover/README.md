## Popover

Компонента блока с тултипом

### PropTypes

Наследует свойства [`QAProps`](../types.ts).

| Property            | Type               | Required | Values            | Default             | Description                                                                                                                                                                                |
| :------------------ | :----------------- | :------- | :---------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children            | `ReactNode`        |          |                   |                     | контент на котором будет показываться тултип                                                                                                                                               |
| theme               | `String`           |          | `info`, `special` | `info`              | тема тултипа                                                                                                                                                                               |
| placement           | `Array`            |          |                   | [`right`, `bottom`] | направления открытия тултипа                                                                                                                                                               |
| hasArrow            | `Boolean`          |          |                   | `true`              | настройка наличия хвостика у тултипа                                                                                                                                                       |
| openOnHover         | `Boolean`          |          |                   | `true`              | настройка открытия тултипа по ховеру                                                                                                                                                       |
| autoclosable        | `Boolean`          |          |                   | `true`              | настройка автоматического закрытия тултипа, если курсор outside                                                                                                                            |
| behavior            | `TooltipBehavior`  |          |                   | `DelayedClosing`    | Поведение открытия/закрытия тултипа при включенном `openOnHover` (без задержки, с задержкой, с задержкой только закрытия). Не применяется при переданных `delayOpening` или `delayClosing` |
| delayOpening        | `Number`           |          |                   | `0`                 | Настройка задержки открытия тултипа при включенном `openOnHover`. Рекомендуется использовать `behavior`                                                                                    |
| delayClosing        | `Number`           |          |                   | `300`               | Настройка задержки закрытия тултипа при включенном `autoclosable`. Рекомендуется использовать `behavior`                                                                                   |
| title               | `String`           |          |                   |                     | название в тултипе                                                                                                                                                                         |
| content             | `ReactNode`        |          |                   |                     | контент тултипа                                                                                                                                                                            |
| contentClassName    | `String`           |          |                   |                     | класс для `content`                                                                                                                                                                        |
| htmlContent         | `String`           |          |                   |                     | отрендерится html контент тултипа через `dangerouslySetInnerHTML`                                                                                                                          |
| links               | `Array`            |          |                   | []                  | ссылки под контентом, может принимать <br/> `{ text: 'Link 1', href: 'https://yandex.ru'}` или <br/> `{ text: 'Link 2', onClick: () => callbackOnLinkClick() }`                            |
| tooltipActionButton | `Object`           |          |                   |                     | отрендерится кнопка если передан следующий объект <br/> `{ text: 'Button', onClick: () => callbackOnClick() }`                                                                             |
| tooltipOffset       | `[Number, Number]` |          |                   |                     | смещение тултипа относительно контрола                                                                                                                                                     |
| onClick             | `Function`         |          |                   |                     | если указана, будет вызвана при клике на anchor. Если функция вернет `true`, после этого будет открыт tooltip. Если `false` - тултип не откроется.                                         |
| className           | `String`           |          |                   |                     | имя css класса для контрола                                                                                                                                                                |
| offset              | `Object`           |          |                   |                     | задать смещение контрола <br/> `{ top: 0, left: 0 }`                                                                                                                                       |
| anchorRef           | `React.RefObject`  |          |                   |                     | Позволяет использовать кастомный анкор. Отключает `openByHover` и `onClick` у компоненты                                                                                                   |
| onOpenChange        | `Function`         |          |                   |                     | Может быть полезным для отложенной генерации содержимого тултипа                                                                                                                           |

### Examples

Тултип с отрендеренной html разметкой (для обычного текста лучше использовать `content`) и автоматическим закрытием когда курсор вне подсказки в течение `delayClosing`:

```jsx
<Popover
  delayClosing={500}
  offset={{
    top: 2,
  }}
  links={[
    {
      text: 'Lorem ipsum href',
      href: 'https://yandex.ru',
    },
    {
      text: 'Lorem ipsum onClick',
      onClick: () => alert('Lorem ipsum onClick'),
    },
  ]}
  placement={['right', 'bottom']}
  title="Simple tooltip"
  htmlContent={
    '<b>Lorem ipsum</b> dolor sit <a href="https://yandex.ru" target="_blank">amet</a>, at scelerisque suspendisse'
  }
  tooltipActionButton={{
    text: 'Actions',
    onClick: () => console.log('just action happened'),
  }}
>
  <div>click me</div>
</Popover>
```

Подсказка с нетекстовым контентом в тултипе:

```js
<Popover icon={{data: iconQuestionMark}} content={<Loader size="s" />}>
  Tooltip
</Popover>
```
