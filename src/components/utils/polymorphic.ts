import type * as React from 'react';

export type PolymorphicCustomElementType = Exclude<React.ElementType, 'a' | 'button'> | undefined;

export type PolymorphicComponentProps<
    CommonProps,
    T extends Exclude<PolymorphicCustomElementType, undefined>,
> = CommonProps &
    React.ComponentPropsWithoutRef<T> & {
        component: T;
    };

export function isPolymorphicComponentProps<AnyProps, ComponentProps extends AnyProps>(
    props: AnyProps,
): props is ComponentProps {
    return (props as {component?: unknown}).component !== undefined;
}

export function isPolymorphicLinkProps<AnyProps, LinkProps extends AnyProps>(
    props: AnyProps,
): props is LinkProps {
    return (props as {href?: unknown}).href !== undefined;
}

export type PolymorphicOverloadProps<
    T extends PolymorphicCustomElementType,
    P,
    ComponentProps,
    LinkProps,
    ButtonProps,
    ComponentRef = T extends string ? React.ComponentRef<T> : T,
    LinkRef = HTMLAnchorElement,
    ButtonRef = HTMLButtonElement,
> = P extends {component: Exclude<T, undefined>}
    ? ComponentProps & {ref?: React.Ref<ComponentRef>}
    : P extends {href: string}
      ? LinkProps & {ref?: React.Ref<LinkRef>}
      : ButtonProps & {ref?: React.Ref<ButtonRef>};
