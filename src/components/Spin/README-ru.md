<!--GITHUB_BLOCK-->

# Spin

<!--/GITHUB_BLOCK-->

```tsx
import {Spin} from '@gravity-ui/uikit';
```

`Spin` — это компонент, который отображает состояние загрузки (вращающийся полукруг) в инлайн-сценариях. В отличие от `Loader`, этот компонент применяется для отображения состояния загрузки в инлайн-контексте — например, в `Button` или `Label`.

### Размер

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Spin size="xs" />
<Spin size="s" />
<Spin size="m" />
<Spin size="l" />
<Spin size="xl" />
`}
>
    <UIKit.Spin size="xs" />
    <UIKit.Spin size="s" />
    <UIKit.Spin size="m" />
    <UIKit.Spin size="l" />
    <UIKit.Spin size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Spin size="xs" />
<Spin size="s" />
<Spin size="m" />
<Spin size="l" />
<Spin size="xl" />
```

<!--/GITHUB_BLOCK-->

`XS` — очень маленький.

`S` — маленький, применяется, когда спин среднего размера слишком велик.

`M` — средний (базовый), используется в большинстве случаев.

`L` — большой, применяется, когда спин среднего размера слишком мал.

`XL` — очень большой.

## Свойства

| Имя       | Описание                                       |               Тип               | Значение по умолчанию |
| :-------- | :--------------------------------------------- | :-----------------------------: | :-------------------: |
| size      | Размер спина.                                  | `"xs"` `"s"` `"m"` `"l"` `"xl"` |         `"m"`         |
| style     | Пользовательские CSS-стили корневого элемента. |      `React.CSSProperties`      |                       |
| className | Пользовательский CSS-класс корневого элемента. |            `string`             |                       |
| qa        | Атрибут тестирования (`data-qa`).              |            `string`             |                       |
