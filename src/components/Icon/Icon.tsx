import * as React from 'react';

import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {a11yHiddenSvgProps} from '../utils/svg';

import type {SVGIconData} from './types';
import {
    getStringViewBox,
    isComponentSvgData,
    isSpriteData,
    isStringSvgData,
    isSvgrData,
    prepareStringData,
} from './utils';

import './Icon.scss';

export type IconData = SVGIconData;

interface IconComposition {
    prefix?: string;
}

export interface IconProps extends QAProps, DOMProps {
    data: IconData;
    width?: number | string;
    height?: number | string;
    size?: number | string;
    fill?: string;
    stroke?: string;
}

const b = block('icon');

export const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> &
    IconComposition = React.forwardRef<SVGSVGElement, IconProps>(
    (
        {data, width, height, size, className, style, fill = 'currentColor', stroke = 'none', qa},
        ref,
    ) => {
        // This component supports four different ways to load and use icons:
        // - svg-react-loader
        // - svg-sprite-loader
        // - @svgr/webpack
        // - string with raw svg

        let w, h;

        if (size) {
            w = size;
            h = size;
        }

        if (width) {
            w = width;
        }

        if (height) {
            h = height;
        }

        // Parsing viewBox to get width and height in case they were not specified
        // For svg-react-loader svg attributes are available in component defaultProps
        // In case with @svgr/webpack svg attributes can be fetched from the react element
        // after calling svgr-component without any propses
        let viewBox: string | undefined;

        if (isSpriteData(data)) {
            ({viewBox} = data);
        } else if (isStringSvgData(data)) {
            viewBox = getStringViewBox(data);
        } else if (isComponentSvgData(data)) {
            ({viewBox} = data.defaultProps);
        } else if (isSvgrData(data)) {
            const el = data({}) as React.ReactElement;

            if (el) {
                ({viewBox} = el.props);
            }
        }

        if (viewBox && (!w || !h)) {
            const values = viewBox.split(/\s+|\s*,\s*/);

            if (!w) {
                w = values[2];
            }
            if (!h) {
                h = values[3];
            }
        }

        const props = {
            xmlns: 'http://www.w3.org/2000/svg',
            xmlnsXlink: 'http://www.w3.org/1999/xlink',
            width: w,
            height: h,
            className: b(null, className),
            style,
            fill,
            stroke,
            'data-qa': qa,
            ...a11yHiddenSvgProps,
        };

        if (isStringSvgData(data)) {
            const preparedData = prepareStringData(data);

            return <svg {...props} ref={ref} dangerouslySetInnerHTML={{__html: preparedData}} />;
        }

        if (isSpriteData(data)) {
            const href = Icon.prefix + (data.url || `#${data.id}`);

            return (
                <svg {...props} viewBox={viewBox} ref={ref}>
                    <use href={href} xlinkHref={href} />
                </svg>
            );
        }

        // SVG wrapping is needed for compability with sprite-loader
        // So we removing width and height for internal component so only external one is specifying them

        const IconComponent = data;
        if (IconComponent.defaultProps) {
            IconComponent.defaultProps.width = IconComponent.defaultProps.height = undefined;
        }

        return (
            <svg {...props} ref={ref}>
                <IconComponent width={undefined} height={undefined} />
            </svg>
        );
    },
);

Icon.displayName = 'Icon';
Icon.prefix = '';
