# useFloatingTransition

The `useFloatingTransition` hook consolidates logic for transition in Floating UI.

## Properties

| Name                    | Description                                                                                                                               |                    Type                     | Default |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------: | :-----: |
| context                 | The Floating UI context from `useFloating`; `context.open` controls the transition.                                                       |              `FloatingContext`              |         |
| duration                | Transition duration in milliseconds, shared or specified separately for opening and closing. Omitted fields in the object default to `0`. | `number \| {open?: number; close?: number}` |         |
| skipTransitionOut       | Completes closing without waiting for its duration. The close phase still runs so consumers can perform exit cleanup before unmounting.   |                  `boolean`                  | `false` |
| onTransitionIn          | Called when the status changes from `initial` to `open`.                                                                                  |                `() => void`                 |         |
| onTransitionInComplete  | Called after the opening duration elapses. Cancelled if closing starts or the component unmounts before it completes.                     |                `() => void`                 |         |
| onTransitionOut         | Called when the status changes from `open` to `close`.                                                                                    |                `() => void`                 |         |
| onTransitionOutComplete | Called when the status changes from `close` to `unmounted`, including when `skipTransitionOut` is enabled.                                |                `() => void`                 |         |

## Result

```ts
interface UseFloatingTransitionResult {
  // Whether the floating element should be rendered, including during transitions.
  isMounted: boolean;
  // Current phase used to apply opening and closing styles.
  status: 'unmounted' | 'initial' | 'open' | 'close';
}
```
