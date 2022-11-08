# useSelect

React hook used to handle items selection in list

### Arguments

| Property     | Type       | Default | Description                                               |
| :----------- | :--------- | :------ | :-------------------------------------------------------- |
| value        | `string[]` | `-`     | Values that represent selected items                      |
| defaultValue | `string[]` | `[]`    | Default values used in case of uncontrolled usage         |
| multiple     | `boolean`  | `false` | Indicates that multiple items can be selected in the list |
| defaultOpen  | `boolean`  | `false` | Initial value for `open` property                         |
| onUpdate     | `function` | `-`     | Invokes inside of `handleSelection` function              |

### Return data

| Property        | Type       | Description                          |
| :-------------- | :--------- | :----------------------------------- |
| value           | `string[]` | Values that represent selected items |
| open            | `boolean`  | List container visibility state      |
| setOpen         | `function` | Sets value for `open` property       |
| handleSelection | `function` | Handles item selection               |
