import React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

const b = block('breadcrumbs');

export type BreadcrumbsButtonProps = {
    title: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    children: React.ReactNode;
} & QAProps;

export function BreadcrumbsButton(props: BreadcrumbsButtonProps) {
    const {qa, ...restProps} = props;

    return (
        <button {...restProps} type="button" className={b('switcher', {more: true})} data-qa={qa} />
    );
}
