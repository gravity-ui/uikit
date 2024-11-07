<!--GITHUB_BLOCK-->

# Client side routing

<!--/GITHUB_BLOCK-->

```tsx
import {unstable_RouterProvider as RouterProvider} from '@gravity-ui/uikit/unstable';
```

## Provider setup

`RouterProvider` component accepts navigate function received from your router for performing a client side navigation.
The following example shows the general pattern.

```jsx
import {useNavigation, useHref} from 'your-router';
import {Link} from '@gravity-ui/uikit';
import {unstable_RouterProvider as RouterProvider} from '@gravity-ui/uikit/unstable';

import type {NavigateOptions, ToOptions} from 'your-router';

declare module '@gravity-ui/uikit' {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigation();

  return (
    <RouterProvider navigate={navigate} useHref={useHref}>
      <Link
        href={{to:"/posts/$postId", params: {postId: '1'}}}
        routerOptions={{replace: true}}
      >
        Post 1 (local link)
      </Link>
      <Link href="https://gravity-ui.com">Gravity UI (external link)</Link>
    </RouterProvider>
  );
}
```

<!--GITHUB_BLOCK-->

<!-- Storybook example -->

<RouterProviderExample />

<!--/GITHUB_BLOCK-->

### React Router v5

```jsx
import {useHistory} from 'react-router-dom';
import {unstable_RouterProvider as RouterProvider} from '@gravity-ui/uikit/unstable';

function App() {
  const history = useHistory();

  return <RouterProvider navigate={history.push}>{/*...*/}</RouterProvider>;
}
```

### React Router v6

```jsx
import {useNavigate, useHref} from 'react-router-dom';
import {unstable_RouterProvider as RouterProvider} from '@gravity-ui/uikit/unstable';

import type {NavigateOptions} from 'react-router-dom';

declare module '@gravity-ui/uikit' {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
}

function App() {
  const navigate = useNavigate();

  return (
    <RouterProvider navigate={navigate} useHref={useHref}>{/*...*/}</RouterProvider>
  );
}
```

### Next.js

`App router`

```jsx
'use client';

import {useRouter} from 'next/navigation';
import {unstable_RouterProvider as RouterProvider} from '@gravity-ui/uikit/unstable';

declare module '@gravity-ui/uikit' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

function App() {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>{/*...*/}</RouterProvider>
  );
}
```

`Pages router`

```jsx
import {useRouter} from 'next/router';
import {
  unstable_Breadcrumbs as Breadcrumbs,
  unstable_RouterProvider as RouterProvider
} from '@gravity-ui/uikit/unstable';

import type {NextRouter} from 'next/router';

declare module '@gravity-ui/uikit' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<NextRouter['push']>[2]>
  }
}

function App() {
  const router = useRouter();

  return (
    <RouterProvider router={(href, opts) => router.push(href, undefined, opts)}>{/*...*/}</RouterProvider>
  );
}
```

### TanStack Router

```jsx
import {useRouter} from '@tanstack/react-router';
import {unstable_RouterProvider as RouterProvider} from '@gravity-ui/uikit/unstable';

import type {NavigateOptions, ToOptions} from '@tanstack/react-router';

declare module '@gravity-ui/uikit' {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function App() {
  const router = useRouter();

  return (
    <RouterProvider
      router={(to, opts) => router.navigate({...to, ...opts})}
      useHref={(to) => router.buildLocation(to).href}
    >
      {/*...*/}
    </RouterProvider>
  );
}
```
