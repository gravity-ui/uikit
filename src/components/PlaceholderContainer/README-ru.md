<!--GITHUB_BLOCK-->

# PlaceholderContainer

<!--/GITHUB_BLOCK-->

`PlaceholderContainer` — это компонент для отображения контента с изображением, текстовой информацией и контролами действий.

## Направление

`PlaceholderContainer` поддерживает направления `row` и `column` для компоновки контента. Направление передается через свойство `direction`. Размер по умолчанию — `row`.

## Размер

Размер `PlaceholderContainer` можно настроить с помощью свойства `size`. Размер по умолчанию — `l`. Принимает значения: `s`, `m`, `l` и `promo`. Значение `promo` устанавливает полную ширину контентной области, без минимальной высоты и с увеличенным размером заголовка.

## Контролы действий

Компонент `PlaceholderContainer` может отрисовывать контролы в форме кнопок или массив кнопок. Для этого используйте свойство `actions`.

<!--GITHUB_BLOCK-->

```tsx
<PlaceholderContainer
  title="Sample with action control"
  description="Some description for PlaceholderContainer component demo"
  direction="column"
  size="s"
  align="center"
  image={
    <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
        <text
          fill="#999999"
          fontFamily="Sans-serif"
          fontSize="16"
          strokeWidth="0"
          textAnchor="middle"
          transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
          x="86.49"
          y="114"
        >
          1:1
        </text>
      </g>
    </svg>
  }
  actions={[
    {
      text: 'Main button',
      view: 'normal',
      onClick: () => console.log('Click by main button'),
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

Вы также можете отрисовывать пользовательские контролы:

<!--GITHUB_BLOCK-->

```tsx
<PlaceholderContainer
  title="Sample with custom action"
  description="Some description for PlaceholderContainer component demo"
  direction="row"
  size="s"
  align="center"
  image={
    <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
        <text
          fill="#999999"
          fontFamily="Sans-serif"
          fontSize="16"
          strokeWidth="0"
          textAnchor="middle"
          transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
          x="86.49"
          y="114"
        >
          1:1
        </text>
      </g>
    </svg>
  }
  actions={
    <DropdownMenu
      defaultSwitcherProps={{view: 'flat-secondary'}}
      items={[
        {text: 'text 1', action: () => console.log()},
        {text: 'text 2', action: () => console.log()},
      ]}
      onSwitcherClick={(e) => console.log(e)}
      switcher={
        <Button>
          Text
          <Icon data={ChevronDown} size={16} />
        </Button>
      }
    />
  }
/>
```

<!--/GITHUB_BLOCK-->

## Изображения и контент

С помощью свойства `image` можно настроить параметры `src` и `alt` для изображения либо передать узел React.

<!--GITHUB_BLOCK-->

```tsx
<PlaceholderContainer
  title="Sample with image node"
  description="Some description for PlaceholderContainer component demo"
  direction="row"
  size="s"
  align="center"
  image={
    <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
        <text
          fill="#999999"
          fontFamily="Sans-serif"
          fontSize="16"
          strokeWidth="0"
          textAnchor="middle"
          transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
          x="86.49"
          y="114"
        >
          1:1
        </text>
      </g>
    </svg>
  }
/>
```

С параметрами `src` и `alt`:

```tsx
<PlaceholderContainer
  title="Sample with image (set by src and alt properties)"
  description="Some description for PlaceholderContainer component demo"
  direction="row"
  size="s"
  align="center"
  image={{
    src: 'https://gravity-ui.com/static/images/design/Resources/img-gravitylib.png',
    alt: 'logo',
  }}
/>
```

<!--/GITHUB_BLOCK-->

Контент `PlaceholderContainer` состоит из секций заголовка и описания, которые задаются через соответствующие свойства. Для отображения пользовательского контента используйте свойство `content`.

```tsx
<PlaceholderContainer
  title="Sample with custom content"
  description="Some description for PlaceholderContainer component demo"
  direction="row"
  size="s"
  align="center"
  image={
    <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
        <text
          fill="#999999"
          fontFamily="Sans-serif"
          fontSize="16"
          strokeWidth="0"
          textAnchor="middle"
          transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
          x="86.49"
          y="114"
        >
          1:1
        </text>
      </g>
    </svg>
  }
  content={
    <div>
      <h3>There is any custom title here</h3>
      <p>
        You can add <strong>here</strong> any long text with custom content and use custom content
        size for displaying very long texts.
      </p>
    </div>
  }
/>
```

## `Align` (выравнивание)

Для настройки выравнивания контента внутри родительского контейнера используйте свойство `align`. Значение по умолчанию — `center`.

## Свойства

| Имя         | Описание                                                                                         |                                      Тип                                      | Значение по умолчанию |
| :---------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------: | :-------------------: |
| className   | HTML-атрибут `class` (опционально).                                                              |                                   `string`                                    |                       |
| direction   | Задает направление компоновки контента. Возможные значения: `"row"` и `"column"`.                |                                   `string`                                    |        `"row"`        |
| size        | Размер компонента. Принимает значения `"s"`, `"m"`, `"l"` и `"promo"`.                           |                                   `string`                                    |         `"l"`         |
| align       | Задает горизонтальное выравнивание контента. Возможные значения: `"center"` и `"left"`.          |                                   `string`                                    |      `"center"`       |
| title       | Текст заголовка контента.                                                                        |                                   `string`                                    |                       |
| description | Текст описания контента.                                                                         |                                   `string`                                    |                       |
| image       | Задает изображение через `src` или передает узел React.                                          | `PlaceholderContainerImageNodeProps`<br/> `\| PlaceholderContainerImageProps` |                       |
| content     | Используется для рендеринга элемента ReactNode вместо контента (заголовка, описания и действий). |                               `React.ReactNode`                               |                       |
| actions     | Используется для рендеринга массива кнопок или элемента ReactNode.                               |     `PlaceholderContainerActionProps[]`<br/> `\|        React.ReactNode `     |                       |
| maxWidth    | Используется для переопределения стандартной максимальной ширины контейнера.                     |                               `number` `string`                               |                       |
