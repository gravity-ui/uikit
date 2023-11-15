## UserAvatar

Component for displaying user avatar.

### PropTypes

| Name           | Type             | Required | Default | Description                                                                                             |
| :------------- | :--------------- | :------- | :------ | :------------------------------------------------------------------------------------------------------ |
| imgUrl         | `string`         |          |         | Link to image                                                                                           |
| fallbackImgUrl | `string`         |          |         | Link to fallback image                                                                                  |
| size           | `UserAvatarSize` |          | 'm'     | Component size. Possible values: `xs`, `s`, `m`, `l`, `xl`                                              |
| srcSet         | `string`         |          |         | `srcSet` attribute of the image                                                                         |
| sizes          | `string`         |          |         | `sizes` attribute of the image                                                                          |
| title          | `string`         |          |         | Tooltip text on hover                                                                                   |
| className      | `string`         |          |         | Class name                                                                                              |
| loading        | `eager \| lazy`  |          |         | The loading attribute specifies whether a browser should load an image immediately or to defer loading. |
