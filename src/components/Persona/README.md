# Persona

The Persona component can be used to display users or user-related information.

### Image

Component can be used with custom image. Works only with `type: "person"`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Persona type="person" text="Charles Darwin" />
<Persona type="email" text="email@example.com" />
<Persona type="empty" text="Alan Turing" />
`}
>
    <UIKit.Persona type="person" text="Charles Darwin" image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg/193px-Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg"/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Persona type="person" text="Charles Darwin" image="<url>" />
```

<!--/GITHUB_BLOCK-->

### Type

Used to specify avatar appearance. Use "person" if you need to represent some kind of personalized entity. Use "email", to represent email adresses. Use "other" for cases, when you don't need an avatar.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Persona type="person" text="Charles Darwin" />
<Persona type="email" text="email@example.com" />
<Persona type="empty" text="Alan Turing" />
`}
>
    <UIKit.Persona type="person" text="Charles Darwin" />
    <UIKit.Persona type="email" text="email@example.com" />
    <UIKit.Persona type="empty" text="Alan Turing" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Persona type="person" text="Charles Darwin (person)" />
<Persona type="email" text="email@example.com (email)" />
<Persona type="empty" text="Alan Turing (other)" />
```

<!--/GITHUB_BLOCK-->

### Size

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Persona type="person" size="s" text="Charles Darwin (s)" />
<Persona type="person" size="n" text="Charles Darwin (n)" />
`}
>
    <UIKit.Persona type="person" size="s" text="Charles Darwin (s)" />
    <UIKit.Persona type="person" size="n" text="Charles Darwin (n)" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Persona type="person" size="s" text="Charles Darwin" />
<Persona type="person" size="n" text="Charles Darwin" />
```

<!--/GITHUB_BLOCK-->

S – Basic size, used in most components.
N – Used when standard labels are too small.

### Interactivity

Component is also interactive. It can be clickable or closable.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Persona text="Charles Darwin" onClick={() => alert('onClick triggered')} />
<Persona text="Charles Darwin" onClose={() => alert('onClose triggered')} />
`}
>
    <UIKit.Persona text="Charles Darwin" onClick={() => alert('onClick triggered')} />
    <UIKit.Persona text="Charles Darwin" onClose={() => alert('onClose triggered')} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Persona text="Charles Darwin" onClick={() => alert('onClick triggered')} />
<Persona text="Charles Darwin" onClose={() => alert('onClose triggered')} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Property  | Description                                                | Default  |
| :-------- | :--------------------------------------------------------- | :------- |
| text      | Visible text `string`                                      |          |
| image     | Image source `string`                                      |          |
| hasBorder | Display border `boolean`                                   | `true`   |
| type      | Avatar appearance: `"person"` `"email"` `"empty"`          | `person` |
| size      | Text size: `"s"` `"n"`                                     | `s`      |
| onClose   | Handle click on button with cross `(text: string) => void` |          |
| onClick   | Handle click on component itself `(text: string) => void`  |          |
| className | Custom CSS class for root element `string`                 |          |
