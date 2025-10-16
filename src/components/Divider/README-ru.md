<!--GITHUB_BLOCK-->

# Divider

<!--/GITHUB_BLOCK-->

```tsx
import {Divider} from '@gravity-ui/uikit';
```

Компонент `Divider` (разделитель) представляет собой тонкую линию для разграничения и группировки элементов с целью усиления их визуальной иерархии.

```tsx
<Divider className="custom-divider" direction="horizontal" />
```

### Ориентация

Ориентацию `Divider` можно задать с помощью свойства `direction`. Ориентация по умолчанию — `horizontal`.

#### Горизонтальная ориентация

<!--LANDING_BLOCK

<ExampleBlock
  code={`
    <Container>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </Text>
        <Divider direction="horizontal"/>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </Text>
    </Container>
`}
>
    <UIKit.Container>
        <UIKit.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </UIKit.Text>
        <UIKit.Divider direction="horizontal"/>
        <UIKit.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </UIKit.Text>
    </UIKit.Container>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Container, Text, Divider} from '@gravity-ui/uikit';

<Container>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
    perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
    aliquid commodi atque sunt officiis natus?
  </Text>
  <Divider orientation="horizontal" />
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
    perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
    aliquid commodi atque sunt officiis natus?
  </Text>
</Container>;
```

<!--/GITHUB_BLOCK-->

#### Вертикальная ориентация

<!--LANDING_BLOCK

<ExampleBlock
    code={`
        <Container>
            <Flex gap={3}>
                <Label>Label</Label>
                <Divider orientation="vertical"/>
                <Label>Label</Label>
                <Divider orientation="vertical"/>
                <Label>Label</Label>
                <Divider orientation="vertical"/>
                <Label>Label</Label>
            </Flex>
        </Container>
    `}
>
    <UIKit.Container>
        <UIKit.Flex gap={3}>
            <UIKit.Label>Label</UIKit.Label>
            <UIKit.Divider orientation="vertical"/>
            <UIKit.Label>Label</UIKit.Label>
            <UIKit.Divider orientation="vertical"/>
            <UIKit.Label>Label</UIKit.Label>
            <UIKit.Divider orientation="vertical"/>
            <UIKit.Label>Label</UIKit.Label>
        </UIKit.Flex>
    </UIKit.Container>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Flex, Label, Divider} from '@gravity-ui/uikit';

<Container>
  <Flex gap={3}>
    <Label>Label</Label>
    <Divider orientation="vertical" />
    <Label>Label</Label>
    <Divider orientation="vertical" />
    <Label>Label</Label>
    <Divider orientation="vertical" />
    <Label>Label</Label>
  </Flex>
</Container>;
```

<!--/GITHUB_BLOCK-->

### Пользовательский контент

<!--LANDING_BLOCK

<ExampleBlock
    code={`
        <Container>
            <Flex gap={3}>
                <Divider>Custom content</Divider>
                <Divider align="center">
                    <Icon data={CheckIcon} size={16} />
                </Divider>
            </Flex>
        </Container>
    `}
>
    <UIKit.Container>
        <UIKit.Flex gap={3}>
            <UIKit.Divider>Custom content</UIKit.Divider>
            <UIKit.Divider>
                <Icon data={CheckIcon} size={16} />
            </UIKit.Divider>
        </UIKit.Flex>
    </UIKit.Container>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Divider, Flex, Container, Icon} from '@gravity-ui/uikit';
import {CheckIcon} from '@gravity-ui/icons';

<Container>
  <Flex gap={3}>
    <Divider>Custom content</Divider>
    <Divider>
      <Icon data={CheckIcon} size={16} />
    </Divider>
  </Flex>
</Container>;
```

<!--/GITHUB_BLOCK-->

### Выравнивание

<!--LANDING_BLOCK

<ExampleBlock
    code={`
        <Container>
            <Flex gap={3}>
                <Divider align="start">Start content</Divider>
                <Divider align="center">Center content</Divider>
                <Divider align="end">End content</Divider>
            </Flex>
        </Container>
    `}
>
    <UIKit.Container>
        <UIKit.Flex gap={3}>
            <UIKit.Divider align="start">Start content</UIKit.Divider>
            <UIKit.Divider align="center">Center content</UIKit.Divider>
            <UIKit.Divider align="end">End content</UIKit.Divider>
        </UIKit.Flex>
    </Container>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Divider, Flex, Container} from '@gravity-ui/uikit';

<Container>
  <Flex gap={3}>
    <Divider align="start">Start content</Divider>
    <Divider align="center">Center content</Divider>
    <Divider align="end">End content</Divider>
  </Flex>
</Container>;
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя         | Описание                                               | Тип                     | Значение по умолчанию |
| :---------- | :----------------------------------------------------- | :---------------------- | :-------------------- |
| className   | HTML-атрибут `class`.                                  | `string`                | -                     |
| orientation | Определяет направление разделителя.                    | `horizontal - vertical` | `horizontal`          |
| children    | Пользовательский контент внутри разделителя.           | `React.ReactNode`       |                       |
| align       | Расположение пользовательского контента.               | `start - center - end`  | `start`               |
| style       | HTML-атрибут `style`.                                  | `React.CSSProperties`   |                       |
| qa          | HTML-атрибут `data-qa`, используется для тестирования. | `string`                |                       |

### API CSS

| Имя                 | Описание            |
| :------------------ | :------------------ |
| `--g-divider-color` | Цвет разделителя.   |
| `--g-divider-size`  | Размер разделителя. |
