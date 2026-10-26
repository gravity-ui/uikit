<!--GITHUB_BLOCK-->

# Icon

<!--/GITHUB_BLOCK-->

`Icon` renders an SVG glyph at a given size and color, taking the SVG as a React component or an imported asset. It serves as a single proxy for using SVGs across the codebase, which can be loaded through a React component or Webpack loaders such as [`SVGR`](https://react-svgr.com/docs/webpack/), [`svg-react-loader`](https://github.com/jhamlet/svg-react-loader), [`svg-inline-loader`](https://github.com/webpack-contrib/svg-inline-loader), or [`svg-sprite-loader`](https://github.com/JetBrains/svg-sprite-loader).

```tsx
import {Icon} from '@gravity-ui/uikit';
```

### React component

```tsx
// CheckIcon.jsx
export function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081Z" />
    </svg>
  );
}

// ---
import {CheckIcon} from './CheckIcon';

<Icon data={CheckIcon} size={16} />;
```

### Webpack loader

```tsx
// webpack.config.js
{
    test: /\.svg$/,
    use: ['<loader-name>'],
}

// check.svg
<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16">
    <path d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081Z" />
</svg>

// ---
import CheckIcon from './check.svg';

<Icon data={CheckIcon} size={16} />;
```

## Properties

| Name      | Description                              |                             Type                             |     Default      |
| :-------- | :--------------------------------------- | :----------------------------------------------------------: | :--------------: |
| data      | Source of SVG icon                       |                          `IconData`                          |                  |
| width     | `width` SVG attribute                    |                      `number` `string`                       |                  |
| height    | `height` SVG attribute                   |                      `number` `string`                       |                  |
| size      | Both `width` and `height` SVG attributes |                      `number` `string`                       |                  |
| fill      | `fill` SVG attribute                     |                           `string`                           | `"currentColor"` |
| stroke    | `stroke` SVG attribute                   |                           `string`                           |     `"none"`     |
| color     | Text color applied to the SVG icon       | `string` (see the values in the **Color** section of `Text`) |                  |
| className | Custom CSS class for the root element    |                           `string`                           |                  |
| style     | Custom styles for the root element       |                       `CSSProperties`                        |                  |
