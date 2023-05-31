import {
    SVGIconComponentData,
    SVGIconData,
    SVGIconDataUriData,
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
    return typeof data === 'object' && 'defaultProps' in data;
}

export function isStringSvgData(data: SVGIconData): data is SVGIconStringData {
    return typeof data === 'string';
}
export function prepareStringData(data: SVGIconStringData) {
    return data.replace(/(width|height)=(["']?)\d+\2/g, '');
}

export function getStringViewBox(data: SVGIconStringData) {
    const match = data.match(/viewBox=(["']?)([\d\s,-]+)\1/);

    return match ? match[2] : undefined;
}

export function isDataUriSvgData(data: SVGIconData): data is SVGIconDataUriData {
    return typeof data === 'string' && !/^data:image\/svg+xml/.test(data);
}

function convertDataUriToStringSvgData(data: SVGIconDataUriData): SVGIconStringData {
    const [options, body] = data.split(',');
    const [, encoding] = options.split(';');

    try {
        return encoding === 'base64' ? atob(body) : decodeURIComponent(body);
    } catch (e) {
        return '<svg></svg>';
    }
}

export function getDataUriViewBox(data: SVGIconDataUriData) {
    return getStringViewBox(convertDataUriToStringSvgData(data));
}
