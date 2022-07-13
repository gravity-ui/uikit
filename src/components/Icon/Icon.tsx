import React from 'react';

import {QAProps} from '../types';
import {SVGIconData} from './types';
import {block} from '../utils/cn';
import {a11yHiddenSvgProps} from '../utils/svg';
import {
    isSpriteData,
    isSvgrData,
    isStringSvgData,
    prepareStringData,
    getStringViewBox,
    isComponentSvgData,
} from './utils';

import './Icon.scss';

export interface IconProps extends QAProps {
    data: SVGIconData;
    width?: number | string;
    height?: number | string;
    size?: number | string;
    fill?: string;
    stroke?: string;
    className?: string;
    /** @deprecated Wrap `<Icon/>` to element with correct role (like button) and add handler here */
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

const b = block('icon');

export function Icon({
    data,
    width,
    height,
    size,
    className,
    onClick,
    fill = 'currentColor',
    stroke = 'none',
    qa,
}: IconProps) {
    // Компонент был реализован для 2 разных лоадеров - svg-react-loader и svg-sprite-loader,
    // возвращающих разные вещи (готовый компонент или объект описание)
    // UPD: также поддержаны @svgr/webpack лоадер и вставка raw svg, переданного в виде строки
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

    // Распаршиваем viewBox, чтобы получить width и height, если они не были указаны
    // в случае svg-react-loader зашитые аттрибуты svg лежат в defaultProps компоненты
    // в случае @svgr/webpack аттрибуты svg можно получить из react-элемента, сделав вызов svgr-компонента без пропсов
    let viewBox: string | undefined;

    if (isSpriteData(data)) {
        ({viewBox} = data);
    } else if (isStringSvgData(data)) {
        viewBox = getStringViewBox(data);
    } else if (isComponentSvgData(data)) {
        ({viewBox} = data.defaultProps);
    } else if (isSvgrData(data)) {
        const el = data({});

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
        onClick,
        fill,
        stroke,
        'data-qa': qa,
        ...a11yHiddenSvgProps,
    };

    if (isStringSvgData(data)) {
        const preparedData = prepareStringData(data);

        return <svg {...props} dangerouslySetInnerHTML={{__html: preparedData}} />;
    }

    if (isSpriteData(data)) {
        return (
            <svg {...props} viewBox={viewBox}>
                <use xlinkHref={Icon.prefix + (data.url || `#${data.id}`)} />
            </svg>
        );
    }

    const IconComponent = data;
    // внешний svg нужен, чтобы аттрибуты указанные в файле не перезаписывались указанными, сохраняя обратную
    // совместимость с sprite-loader
    // у всех иконок должен быть назначен viewBox, из которого устанавливается дефолтные width и height, либо
    // они прилетают из пропсов
    // чтобы внешние пропсы могли переопределять внутренние - внутренние затираются
    if (IconComponent.defaultProps) {
        IconComponent.defaultProps.width = IconComponent.defaultProps.height = undefined;
    }

    return (
        <svg {...props}>
            <IconComponent width={undefined} height={undefined} />
        </svg>
    );
}

Icon.displayName = 'Icon';
Icon.prefix = '';
