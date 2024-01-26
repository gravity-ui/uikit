<!--GITHUB_BLOCK-->

# useSelect

<!--/GITHUB_BLOCK-->

```tsx
import {useSelect} from '@gravity-ui/uikit';
```

The `useSelect` hook used to handle items selection in list

## Properties

| Name         | Description                                               |    Type    | Default |
| :----------- | :-------------------------------------------------------- | :--------: | :-----: |
| value        | Values that represent selected items                      | `string[]` |         |
| defaultValue | Default values used in case of uncontrolled usage         | `string[]` |  `[]`   |
| multiple     | Indicates that multiple items can be selected in the list | `boolean`  | `false` |
| onUpdate     | Invokes inside of `handleSelection` function              | `function` |         |
| defaultOpen  | Initial value for `open` property                         | `boolean`  | `false` |
| open         | Controlled `open` property                                | `boolean`  |         |
| onOpenChange | Invokes while `open` property changes                     | `function` |         |

## Result

| Name            | Description                                                 |    Type    |
| :-------------- | :---------------------------------------------------------- | :--------: |
| value           | Values that represent selected items                        | `string[]` |
| handleSelection | Handles item selection                                      | `function` |
| open            | List container visibility state                             | `boolean`  |
| setOpen         | (deprecated) use toggleOpen. Sets value for `open` property | `function` |
| toggleOpen      | Invert the value of `open`                                  | `function` |
| activeIndex     | Index of active option                                      |  `number`  |
| setActiveIndex  | Sets value for `activeIndex` property                       | `function` |
