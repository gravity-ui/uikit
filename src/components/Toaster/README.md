<!--GITHUB_BLOCK-->

# Toaster

<!--/GITHUB_BLOCK-->

This is a component for adjustable notifications also known as toasts.

## Using Toaster

To show toasts in your application you need to wrap your application in `ToasterProvider`.

```jsx
import {Toaster, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

const toaster = new Toaster();

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <ToasterProvider toaster={toaster}>
    <App />
    <ToasterComponent className="optional additional classes" />
  </ToasterProvider>,
);
```

`toaster` here is the instance of the class, which holds the state with all your toasts and used under the hood in `useToaster` hook and `withToaster` HOC.

But you can also use `toaster` directly in different parts of your application (outside React):

```js
toaster.add({
  title: 'Toaster is here',
});
```

You must use same instance of `Toaster` in React and outside of it to show all toasts in the same container on the screen.
You can implement this logic yourself or import ready-to-use instance from `toaster-singleton` module.

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton';
```

## Using `useToaster`

You can show toasts with the `useToaster` hook in your app components:

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
| removeAll()                   |                    | Deletes all existing notifications                                                                                                      |
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
| actions    | `ToastAction[] \| () => ReactElement`   |          | `undefined` | Array of [actions](./types.ts#L9) that are displayed after `content`, or callback, that returned required actions                                                                                                                                        |
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
