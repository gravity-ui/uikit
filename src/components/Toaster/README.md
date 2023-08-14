# Toaster

Component for adjustable notifications.

## Usage with context

```jsx
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <ToasterProvider>
    <App />
    <ToasterComponent className="optional additional classes" />
  </ToasterProvider>,
);
```

Then in your app components you can show toasts with `useToaster` hook.

```jsx
import {useToaster} from '@gravity-ui/uikit';
import {useEffect} from 'react';

export function FoobarComponent() {
  const {add} = useToaster();

  useEffect(() => {
    add({
      title: 'Toaster is here',
    });
  }, []);

  return null;
}
```

Hook returns methods `add`, `update`, `remove` and `removeAll` (see below).

## Usage as HOC

For class components you can use `withToaster` HOC. This will inject `toaster`
prop to component.

```jsx
import {Component} from 'react';
import {withToaster} from '@gravity-ui/uikit';

class FoobarComponent extends Component {
  render() {
    this.props.toaster.add({});
  }
}

const FoobarWithToaster = withToaster()(FoobarComponent);
```

## Usage as singleton

Toaster has singleton, so when initialized in different parts of the application, the same instance will be returned.
On initialization it is possible to pass className, that will be assigned to dom-element which is wrapping all toasts.

### React < 18

```js
import {Toaster} from '@gravity-ui/uikit';
const toaster = new Toaster();
```

or

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton';
```

### React 18

```js
import ReactDOMClient from 'react-dom/client';
import {Toaster} from '@gravity-ui/uikit';
Toaster.injectReactDOMClient(ReactDOMClient);
const toaster = new Toaster();
```

or

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton-react-18';
```

## Constructor arguments

| Parameter | Type      | Default     | Description                                         |
| :-------- | :-------- | :---------- | :-------------------------------------------------- |
| className | `string`  | `undefined` | Custom class name to add to the component container |
| mobile    | `boolean` | `false`     | Configuration that manages mobile/desktop views     |

## Methods

| Method name                   | Params             | Description                                                                                                                             |
| :---------------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| add(toastOptions)             | `Object`           | Create new notification                                                                                                                 |
| remove(name)                  | `string`           | Delete existing notification manually                                                                                                   |
| update(name, overrideOptions) | `string`, `Object` | Change already rendered notification content. In `overrideOptions` following fields are optional: `title`, `type`, `content`, `actions` |
| has(name)                     | `string`           | Checks if there is a toast with the given name in the list of displayed toasts                                                          |

## More about `add`

Accepts argument `toastOptions` with ongoing notification details:

| Parameter  | Type                                    | Required | Default     | Description                                                                                                                                                         |
| :--------- | :-------------------------------------- | :------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name       | `string`                                | yes      |             | Notification unique name. Notifications with same names collapse into one                                                                                           |
| title      | `string`                                |          |             | Notification title                                                                                                                                                  |
| className  | `string`                                |          |             | CSS-class                                                                                                                                                           |
| autoHiding | `number` or `false`                     |          | 5000        | Time (in milliseconds) after which the notification will hide. Use `false` to disable toast hiding after timeout.                                                   |
| content    | `node`                                  |          | `undefined` | Notification content. [Anything that can be rendered: numbers, strings, elements or an array](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)  |
| type       | `string`                                |          | `undefined` | Notification type. Possible values: `error`, `success`. If `type` is set, icon (success/error) will be added into notification title. _By default there is no icon_ |
| isClosable | `boolean`                               |          | `true`      | Configuration that manages visibility of cross icon, which allows to close notification                                                                             |
| actions    | `ToastAction[]`                         |          | `undefined` | Array of [actions](./types.ts#L9) which displays after `content`                                                                                                    |
| renderIcon | `(toastProps: ToastProps) => ReactNode` |          | `undefined` | Use for toast icon customization. By default type-based behavior is used                                                                                            |

Every `action` is an object with following parameters:

| Parameter        | Type                                      | Required | Default    | Description                                                 |
| :--------------- | :---------------------------------------- | :------- | :--------- | :---------------------------------------------------------- |
| label            | `string`                                  | yes      |            | Action text description                                     |
| onClick          | `() => void`                              | yes      |            | On action click handler                                     |
| view             | [`ButtonView`](../Button/README.md#props) |          | `outlined` | Appearance of the action, same to `view` of the `<Button/>` |
| removeAfterClick | `boolean`                                 |          | `true`     | If notification should be closed after click on action      |
