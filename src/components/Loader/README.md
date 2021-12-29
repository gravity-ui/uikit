Loader
---------------

Component for rendering loading state (flashing bars)

## Properties
| Property     | Type       | Required | Default | Description |
|:---          |:---        |:---:     |:---     |:---         |
| size         | `String`   |          | 'm'     |Component size. Available values: `s`, `m`, `l` |
| className    | `String`   |          |         |CSS class   |

## Typings

```ts

type LoaderSize = 's' | 'm' | 'l';

```

## Examples

```tsx
const Loader = (
    <Loader size="l" />
);
```
