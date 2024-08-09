<!--GITHUB_BLOCK-->

# HelpMark

<!--/GITHUB_BLOCK-->

```tsx
import {HelpMark} from '@gravity-ui/uikit';
```

Component to display help icon with popover

## Examples

Component with rendered raw html (use `content` for plain text) and close on mouse leave after timeout set by `delayClosing`:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
      <HelpMark
        autoclosable
        delayClosing={500}
        offset={{
          top: 2,
        }}
        links={[
          {
            text: 'Lorem ipsum href',
            url: 'https://example.com',
          },
          {
            text: 'Lorem ipsum onClick',
            onClick: () => alert('Lorem ipsum onClick'),
          },
        ]}
        to={['right', 'bottom']}
        title="Simple tooltip"
        htmlContent={
          '<b>Lorem ipsum</b> dolor sit <a href="https://example.com" target="_blank">amet</a>, at scelerisque suspendisse'
        }
        tooltipButton={{
          text: 'Actions',
          onClick: () => console.log('just action happened'),
        }}
      />
`}
>
    <UIKit.HelpMark
      autoclosable
      delayClosing={500}
      offset={{
        top: 2,
      }}
      links={[
        {
          text: 'Lorem ipsum href',
          url: 'https://example.com',
        },
        {
          text: 'Lorem ipsum onClick',
          onClick: () => alert('Lorem ipsum onClick'),
        },
      ]}
      to={['right', 'bottom']}
      title="Simple tooltip"
      htmlContent={
        '<b>Lorem ipsum</b> dolor sit <a href="https://example.com" target="_blank">amet</a>, at scelerisque suspendisse'
      }
      tooltipButton={{
        text: 'Actions',
        onClick: () => console.log('just action happened'),
      }}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<HelpMark
  autoclosable
  delayClosing={500}
  offset={{
    top: 2,
  }}
  links={[
    {
      text: 'Lorem ipsum href',
      url: 'https://example.com',
    },
    {
      text: 'Lorem ipsum onClick',
      onClick: () => alert('Lorem ipsum onClick'),
    },
  ]}
  to={['right', 'bottom']}
  title="Simple tooltip"
  htmlContent={
    '<b>Lorem ipsum</b> dolor sit <a href="https://example.com" target="_blank">amet</a>, at scelerisque suspendisse'
  }
  tooltipButton={{
    text: 'Actions',
    onClick: () => console.log('just action happened'),
  }}
/>
```

<!--/GITHUB_BLOCK-->

Popover with JSX component as content:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
      <HelpMark content={<Spin size="s" view="default" tone="default" progress />} />
`}
>
    <UIKit.HelpMark content={<Spin size="s" view="default" tone="default" progress />} />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<HelpMark content={<Spin size="s" view="default" tone="default" progress />} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Property      | Type                                            | Required | Default             | Description                                                                                                                                      |
| :------------ | :---------------------------------------------- | :------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| theme         | `info` `special`                                |          | `info`              | Appearance                                                                                                                                       |
| className     | `String`                                        |          |                     | Control class name                                                                                                                               |
| placement     | `Array`                                         |          | [`right`, `bottom`] | Allowed popover positions                                                                                                                        |
| autoclosable  | `Boolean`                                       |          | `true`              | Close popover when pointer is outside of control                                                                                                 |
| delayClosing  | `Number`                                        |          | `300`               | Timeout before closing popover (see `autoclosable`)                                                                                              |
| title         | `String`                                        |          |                     | Popover title                                                                                                                                    |
| content       | `ReactNode`                                     |          |                     | Popover content                                                                                                                                  |
| htmlContent   | `String`                                        |          |                     | Render HTML via `dangerouslySetInnerHTML`                                                                                                        |
| links         | `Array`                                         |          | []                  | Links below content, could be <br/> `{ text: 'Link 1', href: 'https://example.com'}` or <br/> `{ text: 'Link 2', onClick: () => onLinkClick() }` |
| tooltipButton | `Object`                                        |          |                     | Render button with this value <br/> `{ text: 'Button', onClick: () => onClick() }`                                                               |
| offset        | `Object`                                        |          | `{ left: 4 }`       | Control popup toggle position offset <br/> `{ top: 0, left: 0 }`                                                                                 |
| buttonProps   | `React.ButtonHTMLAttributes<HTMLButtonElement>` |          |                     | Set attributes to the underlying button element                                                                                                  |
| buttonRef     | `React.RefObject<HTMLButtonElement>`            |          |                     | Ref to the underlying button element                                                                                                             |
