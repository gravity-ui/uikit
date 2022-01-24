## Toaster
Component for adjustable notifications.

#### Usage

```js
import {Toaster} from '@yandex-cloud/uikit';
const toaster = new Toaster();
```

```js
import {toaster} from '@yandex-cloud/uikit';
```

Toaster is **Singleton**, so when initialized in different parts of the application, the same instance will be returned.
On initialization it is possible to pass className, that will be assigned to dom-element which is wrapping all toasts.

#### Methods
| Method name                          | Params            | Description                     |
|:---                                  |:---               |:---                             |
| createToast(toastOptions)            | `Object`          | Create new notification        |
| removeToast(name)                    | `String`          | Delete existing notification manually |
| overrideToast(name, overrideOptions) | `String`, `Object`| Change already rendered notification content. In `overrideOptions` following fields are optional: `title`, `type`, `content`, `actions` |



#### More about `createToast`
Accepts argument `toastOptions` with ongoing notification details:

| Parameter       | Type      | Required | Default     | Description |
|:---             |:---       |:---      |:---         |:---         |
| name            | `String`  |   yes    |             | Notification unique name. Notifications with same names collapse into one |
| title           | `String`  |   yes    |             | Notification title |
| className       | `String`  |          |             | CSS-class |
| allowAutoHiding | `Boolean` |          | `true`      | Configuration that manages notification automatic hiding |
| timeout         | `Number`  |          | 5000        | Time (in milliseconds)after which the notification will hide |
| content         | `node`    |          | `undefined` | Notification content. [Anything that can be rendered: numbers, strings, elements or an array](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) |
| type            | `String`  |          | `undefined` | Notification type. Possible values: `error`, `success`. If `type` is set, icon (success/error) will be added into notification title. *By default there is no icon* |
| isClosable      | `Boolean` |          | `true`      | Configuration that manages visibility of cross icon, which allows to close notification |
| actions         | `Array`   |          | `undefined` | Array of actions which displays after `content` |

Every `action` is an object with following parameters:

| Parameter        | Type         | Required | Default | Description |
|:---              |:---          |:---      |:---     |:---         |
| label            | `String`     |   yes    |         | Action text description |
| onClick          | `() => void` |   yes    |         | On action click handler |
| removeAfterClick | `Boolean`    |          | `true`  | If notification should be closed after click on action |
