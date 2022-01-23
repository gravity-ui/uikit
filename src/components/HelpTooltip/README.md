HelpTooltip
---------------
Компонента для отображения подсказки

### PropTypes
| Property     | Type       | Required | Values | Default | Description |
| :---         | :---       | :---     | :---   | :---    | :---        |
| theme        | `String`   |          | `info`, `special` | `info`     | тема тултипа |
| className    | `String`   |          |        |         | имя css класса для контрола |
| placement    | `Array`    |          |        | [`right`, `bottom`] | направления открытия тултипа |
| autoclosable | `Boolean`  |          |        | `true`  | настройка автоматического закрытия тултипа если курсор outside |
| delayClosing | `Number`   |          |        | `300`   | настройка задержки скрытия тултипа если курсор outside |
| title        | `String`   |          |        |         | название в тултипе |
| content      | `String`   |          |        |         | контент тултипа |
| htmlContent  | `String`   |          |        |         | отрендерится html контент тултипа через dangerouslySetInnerHTML |
| links        | `Array`    |          |        | []      | ссылки под контентом, может принимать  <br/> ```{ text: 'Link 1', href: 'https://yandex.ru'}``` или  <br/> ```{ text: 'Link 2', onClick: () => callbackOnLinkClick() }``` |
| tooltipButton| `Object`   |          |        |         | отрендерится кнопка если передан следующий объект <br/> ```{ text: 'Button', onClick: () => callbackOnClick() }``` |
| offset       | `Object`   |          |        | ```{ left: 4 }``` | задать смещение контрола <br/> ```{ top: 0, left: 0 }``` |

### Examples

Подсказка с отрендеренной html разметкой (для обычного текста лучше использовать `content`) и автоматическим закрытием когда курсор вне подсказки в течение `delayClosing`:
```js
    <HelpTooltip
        autoclosable
        delayClosing={500}
        offset={{
            top: 2
        }}
        links={[{
            text: 'Lorem ipsum href',
            url: 'https://yandex.ru'
        }, {
            text: 'Lorem ipsum onClick',
            onClick: () => alert('Lorem ipsum onClick')
        }]}
        to={['right', 'bottom']}
        title="Simple tooltip"
        htmlContent="<b>Lorem ipsum</b> dolor sit <a href="https://yandex.ru" target="_blank">amet</a>, at scelerisque suspendisse"
        tooltipButton={{
            text: 'Actions',
            onClick: () => console.log('just action happened')
        }}
    />
```

Подсказка с нетекстовым контентом в тултипе:
```js
    <HelpTooltip>
        <Spin size="s" view="default" tone="default" progress/>
    </HelpTooltip>
```

