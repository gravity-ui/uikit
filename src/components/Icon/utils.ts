import type {
    SVGIconComponentData,
    SVGIconData,
    SVGIconSpriteData,
    SVGIconStringData,
    SVGIconSvgrData,
} from './types';

export function isSpriteData(data: SVGIconData): data is SVGIconSpriteData {
    return typeof data === 'object';
}

export function isSvgrData(data: SVGIconData): data is SVGIconSvgrData {
    return typeof data === 'function' && (!data.prototype || !data.prototype.render);
}

export function isComponentSvgData(data: SVGIconData): data is SVGIconComponentData {
    return (typeof data === 'object' || typeof data === 'function') && 'defaultProps' in data;
}

export function isStringSvgData(data: SVGIconData): data is SVGIconStringData {
    return typeof data === 'string';
}
export function prepareStringData(data: SVGIconStringData) {
    return data.replace(/<svg[^>]*>/, (match) => {
        return match
            .replace(/(width|height)=(["']?)\d+\2/g, '')
            .replace(/(\s){2,}\b/g, '$1')
            .replace(/(\s)+>/g, '>');
    });
}

export function getStringViewBox(data: SVGIconStringData) {
    const match = data.match(/viewBox=(["']?)([\d\s,-]+)\1/);

    return match ? match[2] : undefined;
}
