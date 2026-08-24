<!--GITHUB_BLOCK-->

# Tabs

<!--/GITHUB_BLOCK-->

```tsx
import {Tabs} from '@gravity-ui/uikit/legacy';
```

Компонент `Tabs` используется организации контента и навигации по нему, а также для переключения между различными представлениями.

## Элементы

Для рендеринга элементов `Tabs` используйте свойство `items`.

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs
            activeTab="first"
            items={[
                {id: 'first', title: 'First Tab'},
                {id: 'second', title: 'Second Tab'},
                {id: 'third', title: 'Third Tab', disabled: true},
            ]}
        />
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const [activeTab, setActiveTab] = React.useState('second');

return (
  <Tabs
    activeTab={activeTab}
    onSelectTab={(tabId) => setActiveTab(tabId)}
    items={[
      {id: 'first', title: 'First Tab'},
      {id: 'second', title: 'Second Tab'},
      {id: 'third', title: 'Disabled Tab', disabled: true},
    ]}
  />
);
```

<!--/GITHUB_BLOCK-->

`Tabs` также имеет специальный компонент для рендеринга отдельных элементов.

<!--GITHUB_BLOCK-->

```tsx
const [activeTab, setActiveTab] = React.useState('second');

return (
  <Tabs activeTab={activeTab}>
    <Tabs.Item id={'first'} title="Third Tab" onClick={(tabId) => setActiveTab(tabId)} />
    <Tabs.Item id={'second'} title="Active Tab" onClick={(tabId) => setActiveTab(tabId)} />
  </Tabs>
);
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Tabs` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <>
            <Tabs
                activeTab="second"
                size="m"
                items={[
                    {id: 'first', title: 'M Size first'},
                    {id: 'second', title: 'M Size second'},
                ]}
            />
            <Tabs
                activeTab="second"
                size="l"
                items={[
                    {id: 'first', title: 'L Size first'},
                    {id: 'second', title: 'L Size second'},
                ]}
            />
            <Tabs
                activeTab="second"
                size="xl"
                items={[
                    {id: 'first', title: 'XL Size first'},
                    {id: 'second', title: 'XL Size second'},
                ]}
            />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs
    activeTab="second"
    size="m"
    items={[
        {id: 'first', title: 'M Size first'},
        {id: 'second', title: 'M Size second'},
    ]}
/>

<Tabs
    activeTab="second"
    size="l"
    items={[
        {id: 'first', title: 'L Size first'},
        {id: 'second', title: 'L Size second'},
    ]}
/>

<Tabs
    activeTab="second"
    size="xl"
    items={[
        {id: 'first', title: 'XL Size first'},
        {id: 'second', title: 'XL Size second'},
    ]}
/>
```

<!--/GITHUB_BLOCK-->

## Tabs.Item

Используется для рендеринга элемента `Tabs`.

### Иконка

Используется, если нужно отобразить иконку для элемента `Tabs`.

<!--SANDBOX
import {Gear} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs activeTab="first">
            <Tabs.Item
                icon={<Icon size={16} data={Gear} />}
                id="first"
                title="Tab with icon"
                onClick={() => {}}
            />
            <Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
        </Tabs>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs activeTab="first">
  <Tabs.Item
    icon={<Icon size={16} data={GearIcon} />}
    id="first"
    title="Tab with icon"
    onClick={() => {}}
  />
  <Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
</Tabs>
```

<!--/GITHUB_BLOCK-->

### Состояния

Элементы `Tabs` поддерживают флаг `disabled`.

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs activeTab="first">
            <Tabs.Item id="first" title="First Tab" onClick={() => {}} />
            <Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
        </Tabs>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs activeTab="first">
  <Tabs.Item id="first" title="First Tab" onClick={() => {}} />
  <Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
</Tabs>
```

<!--/GITHUB_BLOCK-->

### Счетчик

Используется, если нужно отобразить число для элемента `Tabs`.

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs activeTab="first">
            <Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
            <Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
        </Tabs>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs activeTab="first">
  <Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
  <Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
</Tabs>
```

<!--/GITHUB_BLOCK-->

### Свойства `Tabs.Item`

| Имя      | Описание                         |            Тип             | Значение по умолчанию |
| :------- | -------------------------------- | :------------------------: | :-------------------: |
| id       | Идентификатор вкладки.           |          `string`          |                       |
| title    | Заголовок вкладки.               | `string` `React.ReactNode` |                       |
| meta     | Описание вкладки.                |          `string`          |                       |
| hint     | HTML-атрибут `title`.            |          `string`          |                       |
| icon     | Иконка, отображаемая в начале.   |     `React.ReactNode`      |                       |
| counter  | Число, отображаемое в конце.     |     `React.ReactNode`      |                       |
| label    | `<Label>`, отображаемый в конце. |     `React.ReactNode`      |                       |
| disabled | Неактивное состояние.            |         `boolean`          |                       |

## Свойства

| Имя              | Описание                                                                                 |                                    Тип                                     | Значение по умолчанию |
| :--------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------: | :-------------------: |
| direction        | Направление отображения вкладок (устаревшее свойство).                                   |                                  `string`                                  |     `horizontal`      |
| activeTab        | Идентификатор активной вкладки.                                                          |                                  `string`                                  |                       |
| allowNotSelected | Позволяет не выбирать `activeTab`.                                                       |                                 `boolean`                                  |                       |
| items            | Массив вкладок.                                                                          |                             `TabsItemProps[]`                              |         `[]`          |
| onSelectTab      | Обработчик выбора вкладки.                                                               |                    `onSelectTab?(tabId: string): void`                     |                       |
| wrapTo           | Позволяет обернуть `TabItem` в другой компонент или отрисовать пользовательскую вкладку. | `wrapTo?(item: TabsItemProps, node: React.ReactNode, index: number): void` |                       |
| className        | CSS-класс элемента.                                                                      |                                  `string`                                  |                       |

## API CSS

| Имя                              | Описание                                         |
| :------------------------------- | :----------------------------------------------- |
| `--g-tabs-border-width`          | Ширина границы `Tabs`.                           |
| `--g-tabs-item-height`           | Высота элемента `Tabs`.                          |
| `--g-tabs-item-border-width`     | Ширина границы элемента `Tabs`.                  |
| `--g-tabs-item-gap`              | Расстояние между вкладками.                      |
| `--g-tabs-vertical-item-height`  | Высота вертикального элемента `Tabs`.            |
| `--g-tabs-vertical-item-padding` | Внутренний отступ вертикального элемента `Tabs`. |
