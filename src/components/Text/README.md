<!--GITHUB_BLOCK-->

# Text

<!--/GITHUB_BLOCK-->

```tsx
import {Text} from '@gravity-ui/uikit';
```

## Variant

These are the default fonts that can be overridden in the project. You can see a list of all available fonts [here](https://preview.gravity-ui.com/uikit/?path=/story/typography--variants).

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

This property allows you to hide the overflowing text:

`false`: Used by default.

`true`: Hidden overflow content will be replaced with an ellipsis (`…`).

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

This stands for the `white-space` CSS property. It can be either `nowrap` or `break-spaces`.

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

This stands for the `word-break` CSS property. The only available value is `break-all`. | `break-word`.

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

Specifies the text color. The available colors are:
`primary`, `complementary`, `secondary`, `hint`, `info`, `info-heavy`, `positive`, `positive-heavy`, `warning`, `warning-heavy`, `danger`, `danger-heavy`, `utility`, `utility-heavy`, `misc`, `misc-heavy`, `brand`, `link`, `link-hover`, `link-visited`, `link-visited-hover`, `dark-primary`, `dark-complementary`, `dark-secondary`, `light-primary`, `light-complementary`, `light-secondary`, `light-hint`, `inverted-primary`, `inverted-complementary`, `inverted-secondary`, and `inverted-hint`.

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

| Name          | Description                                                               |                        Type                        |  Default   |
| :------------ | :------------------------------------------------------------------------ | :------------------------------------------------: | :--------: |
| children      | Text content                                                              |                 `React.ReactNode`                  |            |
| className     | `class` HTML attribute                                                    |                      `string`                      |            |
| id            | `id` HTML attribute                                                       |                      `string`                      |            |
| as            | Enables overriding default HTML tag                                       |              `React.ElementType<any>`              |            |
| style         | `style` HTML attribute                                                    |               `React.CSSProperties`                |            |
| variant       | Text font                                                                 |                      `string`                      | `"body-1"` |
| ellipsis      | Hidden overflow content will be replaced with an ellipsis                 |                     `boolean`                      |            |
| ellipsisLines | The number of whole lines of text after which the content will be cut off |                      `number`                      |            |
| whiteSpace    | `white-space` CSS property                                                |            `"nowrap"` `"break-spaces"`             |            |
| wordBreak     | `word-break` CSS property                                                 |            `"break-all"` `"break-word"`            |            |
| color         | Text color                                                                | `string` (see the values in the **Color** section) |            |
| qa            | `data-qa` HTML attribute, used for testing                                |                      `string`                      |            |
