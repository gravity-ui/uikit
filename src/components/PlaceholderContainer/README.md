<!--GITHUB_BLOCK-->

# PlaceholderContainer

<!--/GITHUB_BLOCK-->

`PlaceholderContainer` is a component for displaying content with an image, text content, and action controls.

## Direction

`PlaceholderContainer` has `row` and `column` directions for the content layout. To manage it, use the `direction` property. The default size is `row`.

## Size

Use the `size` property to manage the `PlaceholderContainer` size. The default size is `l`. The possible values are `s`, `m`, `l`, and `promo`. The `promo` value sets the full width of the content section without the minimum content height and a larger title size.

## Action controls

`PlaceholderContainer` can render button controls or an array of buttons. To display it, use the `actions` property.

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

You can also render custom controls:

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

## Image and content

The `image` property enables configuring the image `src` and `alt` settings or a React node.

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

With `src` and `alt` settings:

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

The `PlaceholderContainer` content contains from the title and description sections, which you can set with the appropriate properties. To render custom content, use the `content` property.

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

## Align

To manage the alignment of the content inside the parent container, use the `align` property. The default value is `center`.

## Properties

| Name        | Description                                                                                |                                     Type                                      |  Default   |
| :---------- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------: | :--------: |
| className   | `class` HTML attribute (optional)                                                          |                                   `string`                                    |            |
| direction   | Used to set the content layout direction. The possible values are `"row"` and `"column"`.  |                                   `string`                                    |  `"row"`   |
| size        | Component size. The possible values are `"s"`, `"m"`, `"l"`, and `"promo"`.                |                                   `string`                                    |   `"l"`    |
| align       | Used to set content horizontal alignment. The possible values are `"center"` and `"left"`. |                                   `string`                                    | `"center"` |
| title       | Content title text                                                                         |                                   `string`                                    |            |
| description | Content description text                                                                   |                                   `string`                                    |            |
| image       | Used to set an image by `src` or provide a React node                                      | `PlaceholderContainerImageNodeProps`<br/> `\| PlaceholderContainerImageProps` |            |
| content     | Used to render a node instead of content (title, description, and actions)                 |                               `React.ReactNode`                               |            |
| actions     | Used to render an array of button controls or a custom node                                |     `PlaceholderContainerActionProps[]`<br/> `\|        React.ReactNode `     |            |
| maxWidth    | Used to override the default max-width of the container                                    |                               `number` `string`                               |            |
