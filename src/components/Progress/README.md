<!--GITHUB_BLOCK-->

# Progress

<!--/GITHUB_BLOCK-->

```tsx
import {Progress} from '@gravity-ui/uikit';
```

Progress bar indicates current operation process. It can also be divided into sections.

## Theme

Used for specify color of the whole progress or the composite part.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress text="default" value={80} />
<Progress text="warning" theme="warning" value={70} />
<Progress text="info" theme="info" value={90} />
<Progress text="success" theme="success" value={90} />
<Progress text="danger" theme="danger" value={80} />
<Progress text="misc" theme="misc" value={60} />
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="default" value={80} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="success" theme="success" value={90} />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="warning" theme="warning" value={70} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="danger" theme="danger" value={80} />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="info" theme="info "value={90} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="misc" theme="misc" value={60} />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress text="default" value={80} />
<Progress text="warning" theme="warning" value={70} />
<Progress text="info" theme="info" value={90} />
<Progress text="success" theme="success" value={90} />
<Progress text="danger" theme="danger" value={80} />
<Progress text="misc" theme="misc" value={60} />
```

<!--/GITHUB_BLOCK-->

## States

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress text="Loading" theme="misc" value={60} loading={true} />
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="Loading" theme="misc" value={60} loading={true} />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress text="Loading" theme="misc" value={60} loading={true} />
```

<!--/GITHUB_BLOCK-->

## Size

To control the size of the Progress bar use the size property: `"xs"`, `"s"`, `"m"`. Property `text` is displayed only in `"m"` size.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress theme="success" value={60} size="xs" />
<Progress theme="warning" value={70} size="s" />
<Progress theme="danger" value={80} size="m" />
`}
>
  <div style={{width: '30%'}}><UIKit.Progress theme="success" value={60} size="xs" /></div>
  <div style={{width: '30%'}}><UIKit.Progress theme="warning" value={70} size="s" /></div>
  <div style={{width: '30%'}}><UIKit.Progress theme="danger" value={80} size="m" /></div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress theme="success" value={60} size="xs" />
<Progress theme="warning" value={70} size="s" />
<Progress theme="danger" value={80} size="m" />
```

<!--/GITHUB_BLOCK-->

## Stack

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress
  stack={[
    {theme: 'default', content: 'First', value: 25},
    {theme: 'success', content: 'Second', value: 25},
    {theme: 'warning', content: 'Third', value: 25},
    {theme: 'danger', content: 'Fourth', value: 25},
  ]}
/>
<Progress text="Progress with custom colors"
  stack={[
    {color: '#6e5d8c', value: 33.333333333333336},
    {color: '#5b785b', value: 33.333333333333336},
    {color: '#956069', value: 33.333333333333336},
  ]}
/>
`}
>
<div style={{width: '30%'}}>
  <UIKit.Progress
    stack={[
      {theme: 'default', content: 'First', value: 25},
      {theme: 'success', content: 'Second', value: 25},
      {theme: 'warning', content: 'Third', value: 25},
      {theme: 'danger', content: 'Fourth', value: 25},
    ]}
  />
</div>
<div style={{width: '30%'}}>
  <UIKit.Progress text="Progress with custom colors"
    stack={[
      {color: '#6e5d8c', value: 33.333333333333336},
      {color: '#5b785b', value: 33.333333333333336},
      {color: '#956069', value: 33.333333333333336},
    ]}
  />
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress stack={[
  {theme: 'default', content: 'First', value: 25},
  {theme: 'success', content: 'Second', value: 25},
  {theme: 'warning', content: 'Third', value: 25},
  {theme: 'danger', content: 'Fourth', value: 25},
]} />
<Progress text="Progress with custom colors" stack={[
  {color: '#6e5d8c', value: 33.333333333333336},
  {color: '#5b785b', value: 33.333333333333336},
  {color: '#956069', value: 33.333333333333336},
]} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name            | Description                                                                                                       |                  Type                   | Default     |
| :-------------- | :---------------------------------------------------------------------------------------------------------------- | :-------------------------------------: | :---------- |
| className       | HTML `class` attribute                                                                                            |                `string`                 |             |
| colorStops      | Array of sections themes and values                                                                               | `Array<{theme: string; stop: number;}>` |             |
| colorStopsValue | Alternative value of `colorStops`. Available range: 0 to 100.                                                     |                `number`                 |             |
| loading         | Toggles `loading` state                                                                                           |                `boolean`                | `false`     |
| size            | Sets progress size. Text of progress bar is displayed in `"m"` size only.                                         |                `string`                 | `"m"`       |
| stack           | Configuration of composite progress bar. Not required if a `value` passed.                                        |             `Array<Stack>`              |             |
| stackClassName  | HTML `class` attribute of stack                                                                                   |                `string`                 |             |
| text            | Text inside progress bar                                                                                          |                `string`                 |             |
| theme           | Sets progress color                                                                                               |                `string`                 | `"default"` |
| value           | Current progress value. Available range: 0 to 100. Using `stack` property value is optional and uses as maxValue. |                `number`                 |             |

### `Stack`

| Name      | Description                                                                                                       |    Type     | Default     |
| :-------- | :---------------------------------------------------------------------------------------------------------------- | :---------: | :---------- |
| className | HTML `class` attribute of stack element                                                                           |  `string`   |             |
| color     | Sets background color in HTML `style` attribute                                                                   |  `string`   |             |
| content   | Stack element content                                                                                             | `ReactNode` |             |
| title     | HTML `title` attribute                                                                                            |  `string`   |             |
| theme     | Sets stack element color                                                                                          |  `string`   | `"default"` |
| value     | Current progress value. Available range: 0 to 100. Using `stack` property value is optional and uses as maxValue. |  `number`   |             |
