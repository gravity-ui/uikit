/// <reference types="react" />

declare interface SVGIconSpriteData {
    id: string;
    url: string;
    viewBox: string;
}

declare class SVGReactComponent extends React.Component<React.SVGProps<SVGSVGElement>> {
    static defaultProps: React.SVGProps<SVGSVGElement>;
}

declare type SVGIconComponentData = typeof SVGReactComponent;
declare type SVGIconStringData = string;

interface SVGIconSvgrData extends React.FunctionComponent<React.SVGProps<SVGSVGElement>> {}

declare type SVGIconData =
    | SVGIconComponentData
    | SVGIconSpriteData
    | SVGIconSvgrData
    | SVGIconStringData;

declare module '*.md';
