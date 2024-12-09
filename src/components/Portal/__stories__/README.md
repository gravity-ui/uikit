<!--GITHUB_BLOCK-->

# Portal

<!--/GITHUB_BLOCK-->

```tsx
import {Portal} from '@gravity-ui/uikit';
```

`Portal` is a utility component. Basically, it is a simple wrapper around React's [`createPortal`](https://react.dev/reference/react-dom/createPortal) that allows you to render children into a DOM node outside the parent component.

## Container

By default, `Portal` renders its children into `document.body`; however, you can change this with the `container` property.
Additionally, you can provide a container to all `Portal`s in the React subtree using the `PortalProvder` component.

```tsx
import {Portal, PortalProvider} from '@gravity-ui/uikit'

const myRoot = document.getElementById('my-root');

<Portal>This is rendered inside document.body</Portal>
<Portal container={myRoot}>This is rendered inside #my-root node</Portal>
<PortalProvider container={myRoot}>
    <Portal>This is also rendered inside #my-root</Portal>
</PortalProvider>
```

## Properties

| Name          | Description                                                    |       Type        |     Default     |
| :------------ | :------------------------------------------------------------- | :---------------: | :-------------: |
| children      | Any React content                                              | `React.ReactNode` |                 |
| container     | DOM element's children to mount                                |   `HTMLElement`   | `document.body` |
| disablePortal | If true, renders the children within the normal DOM hierarchy. |     `boolean`     |                 |
