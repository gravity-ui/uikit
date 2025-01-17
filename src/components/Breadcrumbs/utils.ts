import {block} from '../utils/cn';

interface Modifiers {
    metaKey?: boolean;
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
}
export function shouldClientNavigate(link: HTMLAnchorElement, modifiers: Modifiers) {
    // Use getAttribute here instead of link.target. Firefox will default link.target to "_parent" when inside an iframe.
    const target = link.getAttribute('target');
    return (
        link.href &&
        (!target || target === '_self') &&
        link.origin === location.origin &&
        !link.hasAttribute('download') &&
        !modifiers.metaKey && // open in new tab (mac)
        !modifiers.ctrlKey && // open in new tab (windows)
        !modifiers.altKey && // download
        !modifiers.shiftKey
    );
}

export const b = block('breadcrumbs');
