'use client';

import * as React from 'react';

import {Portal} from '../../Portal';
import {useMobile} from '../../mobile';
import {block} from '../../utils/cn';
import {ToastsContext} from '../Provider/ToastsContext';
import {ToastList} from '../ToastList/ToastList';
import {useToaster} from '../hooks/useToaster';
import type {ToastListProps} from '../types';

interface Props extends Pick<ToastListProps, 'mobile' | 'alternateAnimationFunction'> {
    className?: string;
    hasPortal?: boolean;
}

const b = block('toaster');

export function ToasterComponent({
    className,
    mobile,
    alternateAnimationFunction,
    hasPortal = true,
}: Props) {
    const defaultMobile = useMobile();
    const {remove} = useToaster();
    const list = React.useContext(ToastsContext);

    const toaster = (
        <ToastList
            toasts={list}
            removeCallback={remove}
            mobile={mobile ?? defaultMobile}
            alternateAnimationFunction={alternateAnimationFunction}
        />
    );

    if (!hasPortal) {
        return toaster;
    }

    return (
        <Portal>
            <div className={b({mobile: mobile ?? defaultMobile}, className)} aria-live="assertive">
                {toaster}
            </div>
        </Portal>
    );
}

ToasterComponent.displayName = 'ToasterComponent';
