# useSelect

React hook used to handle items selection in list

### Arguments

| Property     | Type       | Default | Description                                               |
| :----------- | :--------- | :------ | :-------------------------------------------------------- |
| value        | `string[]` | `-`     | Values that represent selected items                      |
| defaultValue | `string[]` | `[]`    | Default values used in case of uncontrolled usage         |
| multiple     | `boolean`  | `false` | Indicates that multiple items can be selected in the list |
| onUpdate     | `function` | `-`     | Invokes inside of `handleSelection` function              |
| defaultOpen  | `boolean`  | `false` | Initial value for `open` property                         |
| open         | `boolean`  | -       | Controlled `open` property                                |
| onOpenChange | `function` | `-`     | Invokes while `open` property changes                     |

### Return data

| Property        | Type       | Description                                                 |
| :-------------- | :--------- | :---------------------------------------------------------- |
| value           | `string[]` | Values that represent selected items                        |
| handleSelection | `function` | Handles item selection                                      |
| open            | `boolean`  | List container visibility state                             |
| setOpen         | `function` | (deprecated) use toggleOpen. Sets value for `open` property |
| toggleOpen      | `function` | Inver the value of `open`                                   |
