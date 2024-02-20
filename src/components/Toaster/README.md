<!--GITHUB_BLOCK-->

# Toaster &middot; [![storybook](https://img.shields.io/badge/Storybook-Toaster-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-feedback-toaster--default)

<!--/GITHUB_BLOCK-->

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

For class components, you can use the `withToaster` HOC, which will inject the `toaster`
prop into the component.

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

Toaster has singleton, so when it is initialized in different parts of the application, the same instance will be returned.
On initialization, it is possible to transmit a className that will be assigned to dom-element which wrap all toasts.

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

| Method name                   | Params             | Description                                                                                                                                   |
| :---------------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| add(toastOptions)             | `Object`           | Creates a new notification                                                                                                                    |
| remove(name)                  | `string`           | Manually deletes an existing notification                                                                                                     |
| update(name, overrideOptions) | `string`, `Object` | Changes already rendered notification content. In `overrideOptions`, the following fields are optional: `title`, `type`, `content`, `actions` |
| has(name)                     | `string`           | Checks fora toast with the given name in the list of displayed toasts                                                                         |

## More about `add`

Accepts the argument `toastOptions` with ongoing notification details:

| Parameter  | Type                                    | Required | Default     | Description                                                                                                                                                                                                                              |
| :--------- | :-------------------------------------- | :------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | `string`                                | yes      |             | A unique notification name. Notifications with identical names are collapsed into one                                                                                                                                                    |
| title      | `string`                                |          |             | Notification title                                                                                                                                                                                                                       |
| className  | `string`                                |          |             | CSS-class                                                                                                                                                                                                                                |
| autoHiding | `number` or `false`                     |          | 5000        | Number of ms to delay before hiding the notification. Use `false` to disable toast hiding after timeout.                                                                                                                                 |
| content    | `node`                                  |          | `undefined` | Notification content. [Anything that can be rendered: numbers, strings, elements or an array](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)                                                                       |
| theme      | `string`                                |          | `"normal"`  | A notification theme. Possible values: `"normal"`, `"info"`, `"success"`, `"warning"`, `danger`, `"utility"`. If `theme` is set to other than `"normal"`, the icon will be added into notification title. _By default, there is no icon_ |
| isClosable | `boolean`                               |          | `true`      | A configuration that manages the visibility of the X icon, which allows the user to close the notification                                                                                                                               |
| actions    | `ToastAction[]`                         |          | `undefined` | An array of [actions](./types.ts#L9) that display after `content`                                                                                                                                                                        |
| renderIcon | `(toastProps: ToastProps) => ReactNode` |          | `undefined` | Used to customize the toast icon. Type-based behavior is used by default                                                                                                                                                                 |

Every `action` is an object with following parameters:

| Parameter        | Type                                      | Required | Default    | Description                                                             |
| :--------------- | :---------------------------------------- | :------- | :--------- | :---------------------------------------------------------------------- |
| label            | `string`                                  | yes      |            | Description of action                                                   |
| onClick          | `() => void`                              | yes      |            | On action click handler                                                 |
| view             | [`ButtonView`](../Button/README.md#props) |          | `outlined` | The appearance of the action, the same as the `view` of the `<Button/>` |
| removeAfterClick | `boolean`                                 |          | `true`     | If the notification should close after the action is clicked            |

## CSS API

| Name                       | Description     |
| :------------------------- | :-------------- |
| `--g-toaster-width`        | Container width |
| `--g-toaster-item-padding` | Item padding    |
| `--g-toaster-item-gap`     | Item gap        |
