export type ColSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type Space = 'none' | 'nano' | 'micro' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type MediaType = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type ActiveMediaQuery = MediaType | '';

export type MediaProps<T> = Record<MediaType, T>;

export type MediaPartial<T> = Partial<MediaProps<T>>;

export type WithMedia<T extends {}> = T & {media?: MediaPartial<Partial<T>>};

export type CommonProps = Partial<{
    space: Space;
    spaceRow: Space;
}>;

export type ContainerConfigProps = Partial<{
    gutters: Space;
    spaceRow: Space;
}>;

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

interface SmartProps {
    /**
     * Common props, that can you all layout components
     */
    common: WithMedia<CommonProps>;
    container: WithMedia<ContainerConfigProps>;
}

export interface LayoutTheme {
    /**
     * Override default breakpoints values.
     *
     * @important **you mast override corresponding scss variables**
     */
    breakpoints: MediaProps<number>;
    /**
     * Component props build in into the theme. You can describe the props depending on the current media expression
     */
    smartProps: SmartProps;
}

export interface IsMediaActive {
    (toCheck: MediaType): boolean;
}
