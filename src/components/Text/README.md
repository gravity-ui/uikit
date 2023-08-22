<!--GITHUB_BLOCK-->

# Text

<!--/GITHUB_BLOCK-->

```tsx
import {Text} from '@gravity-ui/uikit';
```

## Variant

These are the default variants that can be overridden in the project

- body:
  - 1: font-size: 13px; line-height: 18px; (used by default)
  - 2: font-size: 15px; line-height: 20px;
  - 3: font-size: 17px; line-height: 24px;
  - short: font-size: 13px; line-height: 16px;
- caption:
  - 1: font-size: 9px; line-height: 12px;
  - 2: font-size: 11px; line-height: 16px;
- header:
  - 1: font-size: 20px; line-height: 24px; font-weight: 600;
  - 2: font-size: 24px; line-height: 28px; font-weight: 600;
- subheader:
  - 1: font-size: 13px; line-height: 18px; font-weight: 600;
  - 2: font-size: 15px; line-height: 20px; font-weight: 600;
  - 2: font-size: 17px; line-height: 24px; font-weight: 600;
- display:
  - 1: font-size: 28px; line-height: 36px; font-weight: 600;
  - 2: font-size: 32px; line-height: 40px; font-weight: 600;
  - 3: font-size: 40px; line-height: 48px; font-weight: 600;
  - 4: font-size: 48px; line-height: 52px; font-weight: 600;
- code:
  - 1: font-size: 12px; line-height: 18px; font-weight: 400; font-family: var(--yc-font-family-monospace);
  - 2: font-size: 14px; line-height: 20px; font-weight: 400; font-family: var(--yc-font-family-monospace);
  - 3: font-size: 16px; line-height: 14px; font-weight: 400; font-family: var(--yc-font-family-monospace);
  - inline-1: font-size: 12px; line-height: 14px; font-weight: 400; font-family: var(--yc-font-family-monospace);
  - inline-2: font-size: 14px; line-height: 16px; font-weight: 400; font-family: var(--yc-font-family-monospace);
  - inline-3: font-size: 16px; line-height: 20px; font-weight: 400; font-family: var(--yc-font-family-monospace);

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text variant="body-1">some text</Text>
<Text variant="caption-2">some text</Text>
<Text variant="display-3">some text</Text>
`}>
    <UIKit.Text variant="body-1">some text</UIKit.Text>
    <UIKit.Text variant="caption-2">some text</UIKit.Text>
    <UIKit.Text variant="display-3">some text</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text variant="body-1">some text</Text>
<Text variant="caption-2">some text</Text>
<Text variant="display-3">some text</Text>
```

<!--/GITHUB_BLOCK-->

### Ellipsis

`false` - used by default.

`true` - hidden overflow content will be displayed with ellipsis `…`

- white-space: nowrap;
- overflow: hidden;
- text-overflow: ellipsis;.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text ellipsis={false}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
<Text ellipsis={true}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
`}>
    <UIKit.Text ellipsis={false}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
    <UIKit.Text ellipsis={true}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text ellipsis={false}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab
    rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente
    exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
<Text ellipsis={true}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab
    rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente
    exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
```

<!--/GITHUB_BLOCK-->

### White Space

white-space css property. Can be `undefined`, `nowrap`, `break-spaces`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"nowrap"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"break-spaces"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
`}>
    <UIKit.Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</UIKit.Text>
    <UIKit.Text whiteSpace={"nowrap"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</UIKit.Text>
    <UIKit.Text whiteSpace={"break-spaces"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"nowrap"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"break-spaces"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
```

<!--/GITHUB_BLOCK-->

### Word Break

word-break css property. Can be `undefined`, `break-all`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
<Text wordBreak="break-all">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
`}>
    <UIKit.Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
    <UIKit.Text wordBreak="break-all">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic
    delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam
    quibusdam libero ipsa veritatis quisquam!</Text>
<Text wordBreak="break-all">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus
    est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente
    exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
```

<!--/GITHUB_BLOCK-->

### Color

set color of the text.
Options: `primary`, `complementary`, `secondary`, `hint`, `info`, `info-heavy`, `positive`, `positive-heavy`, `warning`, `warning-heavy`, `danger`, `danger-heavy`, `utility`, `utility-heavy`, `misc`, `misc-heavy`, `brand`, `link`, `link-hover`, `link-visited`, `link-visited-hover`, `dark-primary`, `dark-complementary`, `dark-secondary`, `light-primary`, `light-complementary`, `light-secondary`, `light-hint`, `inverted-primary`, `inverted-complementary`, `inverted-secondary`, `inverted-hint`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text color="info">some text</Text>
<Text color="positive">some text</Text>
<Text color="warning">some text</Text>
`}>
    <UIKit.Text color="info">some text</UIKit.Text>
    <UIKit.Text color="positive">some text</UIKit.Text>
    <UIKit.Text color="warning">some text</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text color="info">some text</Text>
<Text color="positive">some text</Text>
<Text color="warning">some text</Text>
```

<!--/GITHUB_BLOCK-->

## Properties

| Property   | Description                                             |                Type                | Default  |
| :--------- | :------------------------------------------------------ | :--------------------------------: | :------: |
| children   | Text content                                            |            `ReactNode`             |          |
| className  | HTML `class` attribute                                  |              `string`              |          |
| as         | Ability to override default html tag                    |         `ElementType<any>`         |          |
| style      | HTML `style` attribute                                  |          `CSSProperties`           |          |
| variant    | Font of the text                                        |              `string`              | `body-1` |
| ellipsis   | Hidden overflow content will be displayed with ellipsis |             `boolean`              |          |
| whiteSpace | White-space css property                                |    `"nowrap"` `"break-spaces"`     |          |
| wordBreak  | Word-break css property                                 |           `"break-all"`            |          |
| color      | Color of the text                                       | See options in the "Color" section |          |
| ref        |                                                         |               `any`                |          |
