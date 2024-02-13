<!--GITHUB_BLOCK-->

# Palette

<!--/GITHUB_BLOCK-->

```tsx
import {Palette} from '@gravity-ui/uikit';
```

The `Palette` component is used display a grid of icons/emojis/reactions/symbols which you can select or unselect.

<!--/GITHUB_BLOCK-->

### Disabled state

You can disable every option with the `disabled` property. If you want to disable only a portion of options, you can change the `disabled` property of some of the `options` (`PaletteOption[]`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    // disable a single item
    {content: '😎', value: 'ID-cool', disabled: true},
    {content: '🥴', value: 'ID-woozy'},
];
// or disable all of them
<Palette options={options} disabled={true} />
`}
>
    <UIKit.Palette
        options={[
            // disable a single item
            {content: '😎', value: 'ID-cool', disabled: true},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>;

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
<Palette options={options} size={"s"} /> // «s» is the default
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
        size={'xs'}
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size={'s'}
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size={'m'}
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size={'l'}
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size={'xl'}
    />
</ExampleBlock>;

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} size={"xs"} />
<Palette options={options} size={"s"} /> // «s» is the default
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
    <Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        columns={1}
    />
</ExampleBlock>;

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

`PaletteValue = string | number`.

`PaletteProps`:

| Name            | Description                                                                             |                          Type                          | Default |
| :-------------- | :-------------------------------------------------------------------------------------- | :----------------------------------------------------: | :-----: |
| aria-label      | HTML `aria-label` attribute.                                                            |                        `string`                        |         |
| aria-labelledby | ID of the visible `Palette` caption element                                             |                        `string`                        |         |
| className       | HTML `class` attribute.                                                                 |                        `string`                        |         |
| columns         | Number of elements per row.                                                             |                        `number`                        |   `6`   |
| defaultValue    | Sets the initial value state when the component is mounted.                             |                    `PaletteValue[]`                    |         |
| disabled        | Disables the options.                                                                   |                       `boolean`                        | `false` |
| iconClassName   | HTML `class` attribute for the icon inside button.                                      |                        `string`                        |         |
| onBlur          | `onBlur` event handler.                                                                 | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onFocus         | `onFocus` event handler.                                                                | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onUpdate        | Fires when the user changes the state. Provides the new value as a callback's argument. |           `(value: PaletteValue[]) => void`            |         |
| optionClassName | HTML `class` attribute for the palette button.                                          |                        `string`                        |         |
| options         | List of options (palette elements).                                                     |                   `PaletteOption[]`                    |  `[]`   |
| qa              | HTML `data-qa` attribute, used in tests.                                                |                        `string`                        |         |
| rowClassName    | HTML `class` attribute for a palette row.                                               |                        `string`                        |         |
| size            | Sets the size of the elements.                                                          |                    `s` `m` `l` `xl`                    |   `s`   |
| style           | HTML `style` attribute.                                                                 |                 `React.CSSProperties`                  |         |
| value           | Current value for controlled usage of the component.                                    |                    `PaletteValue[]`                    |         |

`PaletteOption`:

| Name     | Description             |      Type      | Default |
| :------- | :---------------------- | :------------: | :-----: |
| content  | HTML `class` attribute. |  `ReactNode`   |         |
| disabled | Disables the button.    |   `boolean`    | `false` |
| title    | HTML `title` attribute. |    `string`    |         |
| value    | Control value.          | `PaletteValue` |         |

`PaletteControlProps`:

| Name          | Description                                        |                          Type                          | Default |
| :------------ | :------------------------------------------------- | :----------------------------------------------------: | :-----: |
| checked       | Whether the option is selected or not.             |                       `boolean`                        | `false` |
| className     | HTML `class` attribute.                            |                        `string`                        |         |
| disabled      | Disables the button.                               |                       `boolean`                        | `false` |
| iconClassName | HTML `class` attribute for the icon inside button. |                        `string`                        |         |
| onBlur        | `onBlur` event handler.                            | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onFocus       | `onFocus` event handler.                           | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onUpdate      | Fires when the user (un)selects the element.       |               `(value: boolean) => void`               |         |
| qa            | HTML `data-qa` attribute, used in tests.           |                        `string`                        |         |
| size          | Size of the button.                                |                    `s` `m` `l` `xl`                    |   `s`   |
| style         | HTML `style` attribute.                            |                 `React.CSSProperties`                  |         |
| value         | HTML `value` attribute.                            |                        `string`                        |         |
