<!--GITHUB_BLOCK-->

# Portal &middot; [![storybook](https://img.shields.io/badge/Storybook-Portal-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-utils-portal--default)

<!--/GITHUB_BLOCK-->

```tsx
import {Portal} from '@gravity-ui/uikit';
```

`Portal` is a utility component, a simple wrapper around React [`createPortal`](https://react.dev/reference/react-dom/createPortal)
that allows you to render children into a DOM node outside the parent component.

## Container

By default, `Portal` renders its children into `document.body`; however, it can be changed with the `container` property.
Additionally, a container can be provided to all `Portal`s in the React subtree using the `PortalProvder` component.

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

| Name          | Description                                           |       Type        |     Default     |
| :------------ | :---------------------------------------------------- | :---------------: | :-------------: |
| children      | Any React content                                     | `React.ReactNode` |                 |
| container     | DOM element children to be mounted                    |   `HTMLElement`   | `document.body` |
| disablePortal | If true, renders children within normal DOM hierarchy |     `boolean`     |                 |
