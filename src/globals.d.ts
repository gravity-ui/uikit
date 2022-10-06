declare module '*.docs.mdx' {
    const MDXComponent: (props: any) => JSX.Element;

    export default MDXComponent;
}

// Override default typing due TS4023 error. It caused by a lack of typings.
declare module 'bem-cn-lite' {
    import {BemSettings} from 'bem-cn';
    export interface Modifications {
        [name: string]: string | boolean | undefined;
    }
    declare function bemClassNameLite(blockName: string): {
        (elementName: string, modifiers: Modifications | null, mixin?: string | undefined): string;
        (elementName: string, mixin?: string | undefined): string;
        (elementName: string, modifiers: Modifications): string;
        (mods: Modifications | null, mixin?: string | undefined): string;
        (elementName: string): string;
        (mods: Modifications | null): string;
        (): string;
        builder(): import('bem-cn').Block;
    };
    declare namespace bemClassNameLite {
        const setup: (config: BemSettings) => void;
        const reset: () => void;
    }
    export default bemClassNameLite;
}
