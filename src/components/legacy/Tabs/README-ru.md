<!--GITHUB_BLOCK-->

# Tabs

<!--/GITHUB_BLOCK-->

```tsx
import {Tabs} from '@gravity-ui/uikit/legacy';
```

Компонент `Tabs` используется организации контента и навигации по нему, а также для переключения между различными представлениями.

## Элементы

Для рендеринга элементов `Tabs` используйте свойство `items`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs
    activeTab="first"
    items={[
        {id: 'first', title: 'First Tab'},
        {id: 'second', title: 'Second Tab'},
        {id: 'third', title: 'Third Tab', disabled: true},
    ]}
/>
`}
>
    <UIKit.Tabs
        activeTab="first"
        items={[
            {id: 'first', title: 'First Tab'},
            {id: 'second', title: 'Second Tab'},
            {id: 'third', title: 'Third Tab', disabled: true},
        ]}
    />
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.Tabs
        activeTab="second"
        size="m"
        items={[
            {id: 'first', title: 'M Size first'},
            {id: 'second', title: 'M Size second'},
        ]}
    />
    <UIKit.Tabs
        activeTab="second"
        size="l"
        items={[
            {id: 'first', title: 'L Size first'},
            {id: 'second', title: 'L Size second'},
        ]}
    />
    <UIKit.Tabs
        activeTab="second"
        size="xl"
        items={[
            {id: 'first', title: 'XL Size first'},
            {id: 'second', title: 'XL Size second'},
        ]}
    />
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs activeTab="first">
    <Tabs.Item
        icon={<Icon size={16} data={GearIcon} />}
        id="first"
        title="Tab with icon"
        onClick={() => {}}
    />
    <Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
</Tabs>
`}
>
    <UIKit.Tabs activeTab="first">
        <UIKit.Tabs.Item
            icon={
                <UIKit.Icon data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
                )} size={16} />
            }
            id="first"
            title="Tab with icon"
            onClick={() => {}}
        />
        <UIKit.Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
    </UIKit.Tabs>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs activeTab="first">
    <Tabs.Item id="first" title="First Tab" onClick={() => {}} />
    <Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
</Tabs>
`}
>
    <UIKit.Tabs activeTab="first">
        <UIKit.Tabs.Item id="first" title="First Tab" onClick={() => {}} />
        <UIKit.Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
    </UIKit.Tabs>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs activeTab="first">
    <Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
    <Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
</Tabs>
`}
>
    <UIKit.Tabs activeTab="first">
        <UIKit.Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
        <UIKit.Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
    </UIKit.Tabs>
</ExampleBlock>
LANDING_BLOCK-->

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
