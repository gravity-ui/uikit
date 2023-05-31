import React from 'react';

export interface SVGIconSpriteData {
    id: string;
    url: string;
    viewBox: string;
}

class SVGReactComponent extends React.Component<React.SVGProps<SVGSVGElement>> {
    static defaultProps: React.SVGProps<SVGSVGElement>;
}

export type SVGIconComponentData = typeof SVGReactComponent;
export type SVGIconStringData = string;
export type SVGIconDataUriData = string;

export interface SVGIconSvgrData extends React.FunctionComponent<React.SVGProps<SVGSVGElement>> {}

export type SVGIconData =
    | SVGIconComponentData
    | SVGIconSpriteData
    | SVGIconSvgrData
    | SVGIconStringData
    | SVGIconDataUriData;
