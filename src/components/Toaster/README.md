<!--GITHUB_BLOCK-->

# Toaster

<!--/GITHUB_BLOCK-->

This is a component for adjustable notifications.

## Using `Toaster` with context

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

This way, you can show toasts with the `useToaster` hook in your app components.:

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

The hook returns the `add`, `update`, `remove`, and `removeAll` methods (see below for details).

## Using `Toaster` as a HOC

For class components, you can use the `withToaster` HOC, which will inject the `toaster` property into the component.

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

## Using `Toaster` as a singleton

`Toaster` has a singleton, so when it is initialized in different parts of the application, the same instance will be returned.
On initialization, you can transmit a `className` that will be assigned to a `dom` element that wraps all toasts.

### React under v18

```js
import {Toaster} from '@gravity-ui/uikit';
const toaster = new Toaster();
```

or

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton';
```

### React v18

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
| add(toastOptions)             | `Object`           | Creates a new notification                                                                                                              |
| remove(name)                  | `string`           | Manually deletes an existing notification                                                                                               |
| update(name, overrideOptions) | `string`, `Object` | Changes already rendered notification content. In `overrideOptions`, the `title`, `type`, `content`, and `actions` fields are optional. |
| has(name)                     | `string`           | Checks for a toast with the certain name in the list of displayed toasts                                                                |

## More on `add`

It accepts the `toastOptions` argument with the ongoing notification details:

| Parameter  | Type                                    | Required | Default     | Description                                                                                                                                                                                                                                              |
| :--------- | :-------------------------------------- | :------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | `string`                                | yes      |             | Unique notification name. Notifications with identical names are collapsed into one                                                                                                                                                                      |
| title      | `string`                                |          |             | Notification title                                                                                                                                                                                                                                       |
| className  | `string`                                |          |             | CSS class                                                                                                                                                                                                                                                |
| autoHiding | `number` or `false`                     |          | 5000        | Number of ms to delay hiding the notification. Use `false` to disable hiding the toast after timeout                                                                                                                                                     |
| content    | `node`                                  |          | `undefined` | Notification content. This may be [anything that can be rendered: numbers, strings, elements, or an array](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)                                                                          |
| theme      | `string`                                |          | `"normal"`  | Notification theme. The possible values are `"normal"`, `"info"`, `"success"`, `"warning"`, `danger`, and `"utility"`. If `theme` is set to anything but `"normal"`, the icon will be added into the notification title. _By default, there is no icon_. |
| isClosable | `boolean`                               |          | `true`      | Configuration that manages the visibility of the X icon, which allows the user to close the notification                                                                                                                                                 |
| actions    | `ToastAction[]`                         |          | `undefined` | Array of [actions](./types.ts#L9) that are displayed after `content`                                                                                                                                                                                     |
| renderIcon | `(toastProps: ToastProps) => ReactNode` |          | `undefined` | Used to customize the toast icon. Type-based behavior is used by default                                                                                                                                                                                 |

Every `action` is an object with following parameters:

| Parameter        | Type                                      | Required | Default    | Description                                                              |
| :--------------- | :---------------------------------------- | :------- | :--------- | :----------------------------------------------------------------------- |
| label            | `string`                                  | yes      |            | Action description                                                       |
| onClick          | `() => void`                              | yes      |            | On-action click handler                                                  |
| view             | [`ButtonView`](../Button/README.md#props) |          | `outlined` | Action appearance, same as `view` for `<Button/>`                        |
| removeAfterClick | `boolean`                                 |          | `true`     | Enables or disables closing the notification after the action is clicked |

## CSS API

| Name                       | Description     |
| :------------------------- | :-------------- |
| `--g-toaster-width`        | Container width |
| `--g-toaster-item-padding` | Item padding    |
| `--g-toaster-item-gap`     | Item gap        |
