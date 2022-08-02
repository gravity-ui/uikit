## ShareTooltip

Sharing component

### PropTypes

| Property         | Type                   | Required | Default          | Description                                                                                                                                                                |
| :--------------- | :--------------------- | :------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url              | `String`               | ✔        |                  | share link                                                                                                                                                                 |
| title            | `String`               |          |                  | link title                                                                                                                                                                 |
| text             | `String`               |          |                  | link text                                                                                                                                                                  |
| socialNets       | `Array<SocialNetwork>` |          | `[]`             | social networks list                                                                                                                                                       |
| withCopyLink     | `Boolean`              |          | `true`           | display copy button                                                                                                                                                        |
| useWebShareApi   | `Boolean`              |          | `false`          | [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) usage setting. If turned on default share dialog will be shown (if bbrowser supports it) |
| placement        | `Array`                |          | `['bottom-end']` | tooltip openening direction                                                                                                                                                |
| openByHover      | `Boolean`              |          | `true`           | should open tooltip with hover                                                                                                                                             |
| autoclosable     | `Boolean`              |          | `true`           | should close tooltip when cursor is outside                                                                                                                                |
| closeDelay       | `Number`               |          | `300`            | delay before tooltip will be hidden when cursor is otside                                                                                                                  |
| iconSize         | `Number`               |          |                  | icon-control size                                                                                                                                                          |
| iconClass        | `String`               |          |                  | icon-control mixin                                                                                                                                                         |
| tooltipClassName | `String`               |          |                  | tooltip mixin                                                                                                                                                              |
| className        | `String`               |          |                  | css class for control                                                                                                                                                      |

### Examples

Copy button only:

```js
<ShareTooltip url={url} title={title} text={text} />
```

Social networks only:

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

Social networks and copy button:

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

Web Share API setting (social networks can be specified for non supported api case):

```js
<ShareTooltip url={url} title={title} text={text} useWebShareApi={true} />
```
