import React from 'react';

import {block} from '../utils/cn';

const b = block('breadcrumbs');

export function BreadcrumbsButton(props: {
    title: string;
    onClick: React.MouseEventHandler<HTMLElement>;
    children: React.ReactNode;
}) {
    return <button {...props} type="button" className={b('switcher', {more: true})} />;
}
