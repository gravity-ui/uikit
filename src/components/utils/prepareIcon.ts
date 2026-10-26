import * as React from 'react';

import {Icon} from '../Icon';

import {isOfType} from './isOfType';

const isIcon = isOfType(Icon, {matchDisplayName: false});
const isSvg = isOfType<React.SVGProps<SVGSVGElement>>('svg');

export function prepareIcon(icon: React.ReactNode, size: number | null) {
    let content = icon;

    if (size !== null) {
        if (
            isIcon(icon) &&
            icon.props.size === undefined &&
            (icon.props.width === undefined || icon.props.height === undefined)
        ) {
            content = React.cloneElement(icon, {size});
        } else if (isSvg(icon)) {
            const width = icon.props.width ?? size;
            const height = icon.props.height ?? size;

            if (width !== icon.props.width || height !== icon.props.height) {
                content = React.cloneElement(icon, {width, height});
            }
        }
    }

    return content;
}
