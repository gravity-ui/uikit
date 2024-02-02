<!--GITHUB_BLOCK-->

# EmojiPalette

<!--/GITHUB_BLOCK-->

```tsx
import {EmojiPalette} from '@gravity-ui/uikit';
```

The `EmojiPalette` component is used display a grid of emojis which you can select or unselect.

<!--/GITHUB_BLOCK-->

### Disabled state

You can disable all of the emojis with the `disabled` property. If you want to disable only a portion of emojis, you can change the `disabled` property of some of the `options` (`EmojiOption[]`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: EmojiOption[] = [
    // disable a single item
    {icon: '😎', value: 'ID-cool', disabled: true},
    {icon: '🥴', value: 'ID-woozy'},
];
// or disable all of them
<EmojiPalette options={options} disabled={true} />
`}
>
    <UIKit.EmojiPalette
        options={[
            // disable a single item
            {icon: '😎', value: 'ID-cool', disabled: true},
            {icon: '🥴', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>;

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: EmojiOption[] = [
  // disable a single item
  {icon: '😎', value: 'ID-cool', disabled: true},
  {icon: '🥴', value: 'ID-woozy'},
];
// or disable all of them
<EmojiPalette options={options} disabled={true} />;
```

<!--/GITHUB_BLOCK-->

### Size

To control the size of the `EmojiPalette`, use the `size` property. The default size is `s`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: EmojiOption[] = [
    {icon: '😎', value: 'ID-cool'},
    {icon: '🥴', value: 'ID-woozy'},
];
<EmojiPalette options={options} size={"s"} /> // «s» is the default
<EmojiPalette options={options} size={"m"} />
<EmojiPalette options={options} size={"l"} />
<EmojiPalette options={options} size={"xl"} />
`}
>
    <UIKit.EmojiPalette
        options={[
            {icon: '😎', value: 'ID-cool'},
            {icon: '🥴', value: 'ID-woozy'},
        ]}
        size={'s'}
    />
    <UIKit.EmojiPalette
        options={[
            {icon: '😎', value: 'ID-cool'},
            {icon: '🥴', value: 'ID-woozy'},
        ]}
        size={'m'}
    />
    <UIKit.EmojiPalette
        options={[
            {icon: '😎', value: 'ID-cool'},
            {icon: '🥴', value: 'ID-woozy'},
        ]}
        size={'l'}
    />
    <UIKit.EmojiPalette
        options={[
            {icon: '😎', value: 'ID-cool'},
            {icon: '🥴', value: 'ID-woozy'},
        ]}
        size={'xl'}
    />
</ExampleBlock>;

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: EmojiOption[] = [
    {icon: '😎', value: 'ID-cool'},
    {icon: '🥴', value: 'ID-woozy'},
];
<EmojiPalette options={options} size={"s"} /> // «s» is the default
<EmojiPalette options={options} size={"m"} />
<EmojiPalette options={options} size={"l"} />
<EmojiPalette options={options} size={"xl"} />
```

<!--/GITHUB_BLOCK-->

### Columns

You can change the number of columns in the grid by changing the `columns` property (default is 6).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: EmojiOption[] = [
    {icon: '😎', value: 'ID-cool'},
    {icon: '🥴', value: 'ID-woozy'},
];
<EmojiPalette options={options} columns={12} />
`}
>
    <EmojiPalette
        options={[
            {icon: '😎', value: 'ID-cool'},
            {icon: '🥴', value: 'ID-woozy'},
        ]}
        columns={12}
    />
</ExampleBlock>;

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: EmojiOption[] = [
  {icon: '😎', value: 'ID-cool'},
  {icon: '🥴', value: 'ID-woozy'},
];
<EmojiPalette options={options} columns={12} />;
```

<!--/GITHUB_BLOCK-->

### Custom emojis

You can use your own emojis/icons/images/GIFs by simply changing the `icon` property of `options` (`EmojiOption[]`)

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: EmojiOption[] = [
    {
        icon: <span>{':)'}</span>,
        value: 'happy',
    },
    {
        icon: <span>{':('}</span>,
        value: 'sad',
    },
];
<EmojiPalette options={options} />;
`}
>
    <EmojiPalette
        options={[
            {
                icon: <span>{':)'}</span>,
                value: 'happy',
            },
            {
                icon: <span>{':('}</span>,
                value: 'sad',
            },
        ]}
    />
</ExampleBlock>;

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: EmojiOption[] = [
  {
    icon: <span>{':)'}</span>,
    value: 'happy',
  },
  {
    icon: <span>{':('}</span>,
    value: 'sad',
  },
];
<EmojiPalette options={options} />;
```

<!--/GITHUB_BLOCK-->

### Properties

`EmojiValue = string | number`.

`EmojiPaletteProps`:

| Name            | Description                                                                             |                          Type                          | Default |
| :-------------- | :-------------------------------------------------------------------------------------- | :----------------------------------------------------: | :-----: |
| aria-label      | HTML `aria-label` attribute.                                                            |                        `string`                        |         |
| aria-labelledby | ID of the visible `EmojiPalette` caption element                                        |                        `string`                        |         |
| className       | HTML `class` attribute.                                                                 |                        `string`                        |         |
| columns         | Number of emojis per row.                                                               |                        `number`                        |   `6`   |
| defaultValue    | Sets the initial value state when the component is mounted.                             |                     `EmojiValue[]`                     |         |
| disabled        | Disables the emojis.                                                                    |                       `boolean`                        |  false  |
| iconClassName   | HTML `class` attribute for the emoji icon.                                              |                        `string`                        |         |
| onBlur          | `onBlur` event handler.                                                                 | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onFocus         | `onFocus` event handler.                                                                | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onUpdate        | Fires when the user changes the state. Provides the new value as a callback's argument. |            `(value: EmojiValue[]) => void`             |         |
| optionClassName | HTML `class` attribute for the emoji button.                                            |                        `string`                        |         |
| options         | List of the emojis.                                                                     |                    `EmojiOption[]`                     |  `[]`   |
| qa              | HTML `data-qa` attribute, used in tests.                                                |                        `string`                        |         |
| size            | Sets the size of the emojis.                                                            |                    `s` `m` `l` `xl`                    |   `s`   |
| style           | HTML `style` attribute.                                                                 |                 `React.CSSProperties`                  |         |
| value           | Current value for controlled usage of the component.                                    |                     `EmojiValue[]`                     |         |

`EmojiOption`:

| Name     | Description             |     Type     | Default |
| :------- | :---------------------- | :----------: | :-----: |
| disabled | Disables the button.    |  `boolean`   |  false  |
| icon     | HTML `class` attribute. | `ReactNode`  |         |
| title    | HTML `title` attribute. |   `string`   |         |
| value    | Control value.          | `EmojiValue` |         |

`EmojiControlProps`:

| Name          | Description                                |                          Type                          | Default |
| :------------ | :----------------------------------------- | :----------------------------------------------------: | :-----: |
| checked       | Whether the emoji is selected or not.      |                       `boolean`                        | `false` |
| className     | HTML `class` attribute.                    |                        `string`                        |         |
| disabled      | Disables the button.                       |                       `boolean`                        | `false` |
| iconClassName | HTML `class` attribute for the emoji icon. |                        `string`                        |         |
| value         | HTML `value` attribute.                    |                        `string`                        |         |
| onBlur        | `onBlur` event handler.                    | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onFocus       | `onFocus` event handler.                   | `(event: React.FocusEvent<HTMLButtonElement>) => void` |         |
| onUpdate      | Fires when the user (un)selects the emoji. |               `(value: boolean) => void`               |         |
| qa            | HTML `data-qa` attribute, used in tests.   |                        `string`                        |         |
| size          | Size of the button.                        |                    `s` `m` `l` `xl`                    |   `s`   |
| style         | HTML `style` attribute.                    |                 `React.CSSProperties`                  |         |
