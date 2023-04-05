# Card

Card is content container. It supports multiple types: `selection`, `action`, `container`.

## Properties

| Property  | Type                                                | Required | Default       | Description                                                         |
| :-------- | :-------------------------------------------------- | :------: | :------------ | :------------------------------------------------------------------ |
| children  | `ReactNode`                                         |    ✓     |               | Card's content                                                      |
| type      | `CardType`                                          |          | `'container'` | Card's type affects on available properties                         |
| view      | `SelectionCardView` \| `ContainerCardView`          |          | `'outlined'`  | Available for `type`: `'container'` and `'selection'`               |
| theme     | `CardTheme`                                         |          | `'normal'`    | Card's base color. Available for `type`: `'container'`              |
| size      | `CardSize`                                          |          | `'m'`         | Card's size affects on available properties                         |
| className | `String`                                            |          |               | CSS class                                                           |
| onClick   | `(event: React.MouseEvent<HTMLDivElement>) => void` |          |               | Card click handler. Available for `type`: `'selection'`, `'action'` |
| selected  | `Boolean`                                           |          |               | Selected card. Available for type: `'selection'`                    |
| disabled  | `Boolean`                                           |          |               | Disabled card. Available for type: `'selection'`, `'action'`        |

### Typings

```typescript
type CardType = 'selection' | 'action' | 'container';
type CardSize = 'm' | 'l';

type SelectionCardView = 'outlined' | 'clear';
type ContainerCardView = 'outlined' | 'filled' | 'raised';

type CardTheme = 'normal' | 'info' | 'positive' | 'warning' | 'danger';
```

### Examples

```ts
const containerFilledCard = (
  <Card className="my-card" view="filled" size="m" theme="positive">
    <div>Card's content</div>
  </Card>
);
```

```ts
const selectedCard = (
  <Card
    className="my-card"
    type="selection"
    view="clear"
    size="m"
    onClick={() => {}}
    selected
    disabled
  >
    <div>Card's content</div>
  </Card>
);
```
