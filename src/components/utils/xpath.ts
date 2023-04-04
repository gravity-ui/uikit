import React from 'react';
import md5 from 'blueimp-md5';

import {ElementClass, formatClass, parseClass} from './class-transform';

export interface ElementClassWithInfo extends ElementClass {
    tag: string;
}

export type XpathClassConverter = (
    parsedClass: ElementClassWithInfo,
    strClass: string,
) => ElementClass | undefined;

export interface XpathOptions {
    /** Функция для конвертации и фильтрации классов */
    classConverter?: XpathClassConverter;
    /** Флаг, отключающий замену tag[@class='...'] на tag[@id='...'] в случае присутствия id */
    withoutId?: boolean;
}

type InternalXpathOptions = Required<XpathOptions>;

export function withoutClassMods(
    converter: XpathClassConverter = (arg) => arg,
): XpathClassConverter {
    return (parsedClass, strClass) =>
        parsedClass.mod ? undefined : converter(parsedClass, strClass);
}

function isElement(node: Node): node is Element {
    return node.nodeType === Node.ELEMENT_NODE;
}

function getXpathByNode(node: Node | null, options: InternalXpathOptions): string {
    if (!node || !isElement(node)) {
        return '';
    }
    const tag = node.tagName.toLowerCase();

    let token = `/${tag}`;
    if (node.id && !options.withoutId) {
        token += `[@id='${node.id}']`;
    } else {
        const classes: string[] = [];
        node.classList.forEach((className) => {
            const currentClass = options.classConverter({...parseClass(className), tag}, className);
            if (currentClass) {
                classes.push(formatClass(currentClass));
            }
        });
        if (classes.length) {
            token += `[@class='${classes.join(' ')}']`;
        }
    }

    return getXpathByNode(node.parentElement, options) + token;
}

const defaultXpathOptions: InternalXpathOptions = {
    classConverter: (arg) => arg,
    withoutId: false,
};

export function getXpath(event: React.SyntheticEvent, options?: XpathOptions) {
    const internalOptions = {
        ...defaultXpathOptions,
        ...(options || {}),
    };

    const xpath = getXpathByNode(event.currentTarget || event.target, internalOptions);

    return {
        xpath,
        hash: md5(xpath),
    };
}
