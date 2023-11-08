## User

Display user avatar and his brief info.

### PropTypes

| Name        | Type             | Required | Default | Description                                                                                                     |
| :---------- | :--------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| imgUrl      | `string`         |          |         | Url of user avatar                                                                                              |
| className   | `string`         |          |         | Root element class name                                                                                         |
| name        | `string`         |          |         | User name (first line of info)                                                                                  |
| description | `string`         |          |         | User additional data (second line of info)                                                                      |
| size        | `UserAvatarSize` |          | 'm'     | Component size. Supported values is: `xs`, `s`, `m`, `l`, `xl`. With a smallest size user info is not rendered. |
