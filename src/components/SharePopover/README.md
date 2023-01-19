## SharePopover

Sharing component

### PropTypes

| Property         | Type                  | Required | Default          | Description                                                                                                                                                                |
| :--------------- | :-------------------- | :------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url              | `String`              | ✔        |                  | share link                                                                                                                                                                 |
| title            | `String`              |          |                  | link title                                                                                                                                                                 |
| text             | `String`              |          |                  | link text                                                                                                                                                                  |
| shareOptions     | `Array<ShareOptions>` |          | `[]`             | share options list                                                                                                                                                         |
| withCopyLink     | `Boolean`             |          | `true`           | display copy button                                                                                                                                                        |
| useWebShareApi   | `Boolean`             |          | `false`          | [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) usage setting. If turned on default share dialog will be shown (if bbrowser supports it) |
| placement        | `Array`               |          | `['bottom-end']` | tooltip openening direction                                                                                                                                                |
| openByHover      | `Boolean`             |          | `true`           | should open tooltip with hover                                                                                                                                             |
| autoclosable     | `Boolean`             |          | `true`           | should close tooltip when cursor is outside                                                                                                                                |
| closeDelay       | `Number`              |          | `300`            | delay before tooltip will be hidden when cursor is otside                                                                                                                  |
| iconSize         | `Number`              |          |                  | icon-control size                                                                                                                                                          |
| iconClass        | `String`              |          |                  | icon-control mixin                                                                                                                                                         |
| tooltipClassName | `String`              |          |                  | tooltip mixin                                                                                                                                                              |
| className        | `String`              |          |                  | css class for control                                                                                                                                                      |

### Examples

Copy button only:

```js
<SharePopover url={url} title={title} text={text} />
```

Default share options only:

```js
<SharePopover
  url={url}
  title={title}
  text={text}
  withCopyLink={false}
  shareOptions={[
    ShareOptions.Telegram,
    ShareOptions.Facebook,
    ShareOptions.Twitter,
    ShareOptions.VK,
  ]}
/>
```

Default share options and copy button:

```js
<SharePopover
  url={url}
  title={title}
  text={text}
  shareOptions={[
    ShareOptions.Telegram,
    ShareOptions.Facebook,
    ShareOptions.Twitter,
    ShareOptions.VK,
  ]}
/>
```

With custom share option:

```js
<SharePopover
  url={url}
  title={title}
  text={text}
  withCopyLink={false}
  shareOptions={[
    ShareOptions.Telegram,
    ShareOptions.Facebook,
    ShareOptions.Twitter,
    ShareOptions.VK,
  ]}
>
  <ShareList.Item
    icon={LinkedIn}
    url="https://www-linkedin.com/"
    label="LinkedIn"
    getShareLink={(params: ShareOptionsData) => params.url}
  />
</SharePopover>
```

Web Share API setting (share options can be specified for non supported api case):

```js
<SharePopover url={url} title={title} text={text} useWebShareApi={true} />
```
