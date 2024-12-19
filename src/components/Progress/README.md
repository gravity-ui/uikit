<!--GITHUB_BLOCK-->

# Progress

<!--/GITHUB_BLOCK-->

```tsx
import {Progress} from '@gravity-ui/uikit';
```

The `Progress` component shows current operation progress. It can also be divided into sections.

## Theme

Use the `theme` property to specify color of the whole progress or the composite part:

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress text="default" value={50} />
<Progress text="warning" theme="warning" value={50} />
<Progress text="info" theme="info" value={50} />
<Progress text="success" theme="success" value={50} />
<Progress text="danger" theme="danger" value={50} />
<Progress text="misc" theme="misc" value={50} />
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="default" value={50} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="success" theme="success" value={50} />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="warning" theme="warning" value={50} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="danger" theme="danger" value={50} />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="info" theme="info "value={50} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="misc" theme="misc" value={50} />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress text="default" value={50} />
<Progress text="warning" theme="warning" value={50} />
<Progress text="info" theme="info" value={50} />
<Progress text="success" theme="success" value={50} />
<Progress text="danger" theme="danger" value={50} />
<Progress text="misc" theme="misc" value={50} />
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

To manage the size of the `Progress` component, use the `size` property that can take the following values: `"xs"`, `"s"`, and `"m"`. The `text` property works only with the `"m"` size.

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

## Breakpoints

Use the `colorStops` property to set breakpoints of the `Progress` component.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress
  value={10}
  colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
/>
<Progress
  value={40}
  colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
/>
<Progress
  value={60}
  colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
/>
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress
      value={10}
      colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
    />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress
      value={40}
      colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
    />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress
      value={60}
      colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
    />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress value={10} colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]} />
<Progress value={40} colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]} />
<Progress value={60} colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]} />
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

| Name            | Description                                                                                                                         |                  Type                   |   Default   |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------: | :---------: |
| className       | HTML `class` attribute                                                                                                              |                `string`                 |             |
| colorStops      | Sets breakpoints with themes                                                                                                        | `Array<{theme: string; stop: number;}>` |             |
| colorStopsValue | Sets the value for choosing the current stop or alternative value for colorStops. The available range is from 0 to 100.             |                `number`                 |             |
| loading         | Toggles the `loading` state                                                                                                         |                `boolean`                |   `false`   |
| size            | Sets the progress bar size. The progress bar text can only be displayed in `"m"` size.                                              |                `string`                 |    `"m"`    |
| stack           | Configuration of composite progress bar. Not required if a `value` is provided.                                                     |             `Array<Stack>`              |             |
| stackClassName  | HTML `class` attribute of stack                                                                                                     |                `string`                 |             |
| text            | Text inside the progress bar                                                                                                        |               `ReactNode`               |             |
| theme           | Sets progress color                                                                                                                 |                `string`                 | `"default"` |
| value           | Current progress value. The available range is from 0 to 100. Using the `stack` property value is optional and is used as maxValue. |                `number`                 |             |

### `Stack`

| Name      | Description                                                                                                                           |    Type     |   Default   |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------ | :---------: | :---------: |
| className | `class` HTML attribute of the stack element                                                                                           |  `string`   |             |
| color     | Sets the background color for the `style` HTML attribute                                                                              |  `string`   |             |
| content   | Stack element content                                                                                                                 | `ReactNode` |             |
| title     | `title` HTML attribute                                                                                                                |  `string`   |             |
| theme     | Sets the stack element color                                                                                                          |  `string`   | `"default"` |
| value     | Current progress value. The available range is from 0 to 100. Using the `stack` property value is optional and is used as `maxValue`. |  `number`   |             |
| qa        | `data-qa` HTML attribute, used for testing                                                                                            |  `string`   |             |

## CSS API

| Name                                   | Description                        |
| :------------------------------------- | :--------------------------------- |
| `--g-progress-empty-text-color`        | Empty `Progress` text color        |
| `--g-progress-filled-text-color`       | Filled `Progress` text color       |
| `--g-progress-empty-background-color`  | Empty `Progress` background color  |
| `--g-progress-filled-background-color` | Filled `Progress` background color |
