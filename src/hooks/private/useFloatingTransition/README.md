# useFloatingTransition

The `useFloatingTransition` hook consolidates logic for transition in Floating UI.

## Properties

| Name                    | Description                                         |       Type        |    Default    |
| :---------------------- | :-------------------------------------------------- | :---------------: | :-----------: |
| enabled                 | Whether or not the hook is active                   |     `boolean`     |    `true`     |
| context                 | The Floating UI context from the `useFloating` hook | `FloatingContext` |               |
| duration                | The duration of transition                          |     `number`      |               |
| transitionProperty      | The CSS property that is being transitioned         |     `string`      | `"transform"` |
| onTransitionIn          | The callback fired on transition "in" start         |    `Function`     |               |
| onTransitionInComplete  | The callback fired on transition "in" complete      |    `Function`     |               |
| onTransitionOut         | The callback fired on transition "out" start        |    `Function`     |               |
| onTransitionOutComplete | The callback fired on transition "out" complete     |    `Function`     |               |

## Result

```ts
{
  // Whether or not the floating element should be rendered
  isMounted: boolean;
  // Current status for the floating element
  status: string;
  // "transitionend" event callback to be attached to the element being transitioned
  handleTransitionEnd: Function;
}
```
