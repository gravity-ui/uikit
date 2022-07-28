## ShareTooltip

Компонента для шеринга

### PropTypes

| Property         | Type                   | Required | Default          | Description                                                                                                                                                                                                     |
| :--------------- | :--------------------- | :------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url              | `String`               | ✔        |                  | ссылка, которой надо поделиться                                                                                                                                                                                 |
| title            | `String`               |          |                  | заголовок к ссылке                                                                                                                                                                                              |
| text             | `String`               |          |                  | текст к ссылке                                                                                                                                                                                                  |
| socialNets       | `Array<SocialNetwork>` |          | `[]`             | список социальных сетей                                                                                                                                                                                         |
| withCopyLink     | `Boolean`              |          | `true`           | настройка отображения кнопки копирования ссылки                                                                                                                                                                 |
| useWebShareApi   | `Boolean`              |          | `false`          | настройка использования [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share). Если включить - по клику будет отображаться дефолтный диалог шарилки (если поддерживается браузером) |
| placement        | `Array`                |          | `['bottom-end']` | направления открытия тултипа                                                                                                                                                                                    |
| openByHover      | `Boolean`              |          | `true`           | настройка открытия тултипа по ховеру                                                                                                                                                                            |
| autoclosable     | `Boolean`              |          | `true`           | настройка автоматического закрытия тултипа если курсор outside                                                                                                                                                  |
| closeDelay       | `Number`               |          | `300`            | настройка задержки скрытия тултипа если курсор outside                                                                                                                                                          |
| iconSize         | `Number`               |          |                  | размер иконки-контрола                                                                                                                                                                                          |
| iconClass        | `String`               |          |                  | миксин для иконки-контрола                                                                                                                                                                                      |
| tooltipClassName | `String`               |          |                  | миксин для тултипа                                                                                                                                                                                              |
| className        | `String`               |          |                  | css класс для контрола                                                                                                                                                                                          |

### Examples

Только кнопка корпирования:

```js
<ShareTooltip url={url} title={title} text={text} />
```

Только социальные сети:

```js
<ShareTooltip
  url={url}
  title={title}
  text={text}
  withCopyLink={false}
  socialNets={[
    SocialNetwork.Telegram,
    SocialNetwork.Facebook,
    SocialNetwork.Twitter,
    SocialNetwork.VK,
  ]}
/>
```

Социальные сети и кнопка копирования:

```js
<ShareTooltip
  url={url}
  title={title}
  text={text}
  socialNets={[
    SocialNetwork.Telegram,
    SocialNetwork.Facebook,
    SocialNetwork.Twitter,
    SocialNetwork.VK,
  ]}
/>
```

Web Share API (соц-сети можно указать на случай, если API не поддерживается):

```js
<ShareTooltip url={url} title={title} text={text} useWebShareApi={true} />
```
