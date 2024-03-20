<!--GITHUB_BLOCK-->

# Palette

<!--/GITHUB_BLOCK-->

```tsx
import {Palette} from '@gravity-ui/uikit';
```

The `Palette` component is used display a grid of icons/emojis/reactions/symbols which you can select or unselect.

### Disabled state

You can disable every option with the `disabled` property. If you want to disable only a portion of options, you can change the `disabled` property of some of the `options` (`PaletteOption[]`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
// disable the first item
<Palette options={[{ ...options[0], disabled: true }, options[1]]} disabled={true} />
// or disable all of them
<Palette options={options} disabled={true} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool', disabled: true},
            {content: '🥴', value: 'ID-woozy'},
        ]}
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
  // disable a single item
  {content: '😎', value: 'ID-cool', disabled: true},
  {content: '🥴', value: 'ID-woozy'},
];
// or disable all of them
<Palette options={options} disabled={true} />;
```

<!--/GITHUB_BLOCK-->

### Size

To control the size of the `Palette`, use the `size` property. The default size is `s`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} size={"xs"} />
<Palette options={options} size={"s"} />
<Palette options={options} size={"m"} />
<Palette options={options} size={"l"} />
<Palette options={options} size={"xl"} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="xs"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="s"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="m"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="l"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="xl"
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} size={"xs"} />
<Palette options={options} size={"s"} />
<Palette options={options} size={"m"} />
<Palette options={options} size={"l"} />
<Palette options={options} size={"xl"} />
```

<!--/GITHUB_BLOCK-->

### Columns

You can change the number of columns in the grid by changing the `columns` property (default is `6`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} columns={1} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        columns={1}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
  {content: '😎', value: 'ID-cool'},
  {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} columns={1} />;
```

<!--/GITHUB_BLOCK-->

### Multiple

By default you can (un)select multiple options, but in case you want only one option to be selected, you can disable the `multiple` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} multiple={false} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        multiple={false}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
  {content: '😎', value: 'ID-cool'},
  {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} columns={1} />;
```

<!--/GITHUB_BLOCK-->

### Properties

`PaletteProps`:

| Name            | Description                                                                             |                          Type                          | Default |
| :-------------- | :-------------------------------------------------------------------------------------- | :----------------------------------------------------: | :-----: |
| aria-label      | HTML `aria-label` attribute.                                                            |                        `string`                        |         |
| aria-labelledby | ID of the visible `Palette` caption element                                             |                        `string`                        |         |
| className       | HTML `class` attribute.                                                                 |                        `string`                        |         |
| columns         | Number of elements per row.                                                             |                        `number`                        |   `6`   |
| defaultValue    | Sets the initial value state when the component is mounted.                             |                       `string[]`                       |         |
| disabled        | Disables the options.                                                                   |                       `boolean`                        | `false` |
| multiple        | Allows selecting multiple options.                                                      |                       `boolean`                        | `true`  |
| onBlur          | `onBlur` event handler.                                                                 | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onFocus         | `onFocus` event handler.                                                                | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onUpdate        | Fires when the user changes the state. Provides the new value as a callback's argument. |              `(value: string[]) => void`               |         |
| optionClassName | HTML `class` attribute for the palette button.                                          |                        `string`                        |         |
| options         | List of options (palette elements).                                                     |                   `PaletteOption[]`                    |  `[]`   |
| qa              | HTML `data-qa` attribute, used in tests.                                                |                        `string`                        |         |
| rowClassName    | HTML `class` attribute for a palette row.                                               |                        `string`                        |         |
| size            | Sets the size of the elements.                                                          |                 `xs` `s` `m` `l` `xl`                  |   `m`   |
| style           | HTML `style` attribute.                                                                 |                 `React.CSSProperties`                  |         |
| value           | Current value for controlled usage of the component.                                    |                       `string[]`                       |         |

`PaletteOption`:

| Name     | Description             |    Type     | Default |
| :------- | :---------------------- | :---------: | :-----: |
| content  | HTML `class` attribute. | `ReactNode` |         |
| disabled | Disables the button.    |  `boolean`  | `false` |
| title    | HTML `title` attribute. |  `string`   |         |
| value    | Control value.          |  `string`   |         |
