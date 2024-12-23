'use client';

import {useContext} from 'react';

import {useMobile} from '../../mobile';
import {ToastsContext} from '../Provider/ToastsContext';
import {ToastList} from '../ToastList/ToastList';
import {useToaster} from '../hooks/useToaster';

import {ToasterPortal} from './ToasterPortal';

interface Props {
    className?: string;
    mobile?: boolean;
    hasPortal?: boolean;
}

export function ToasterComponent({className, mobile, hasPortal = true}: Props) {
    const defaultMobile = useMobile();
    const {remove} = useToaster();
    const list = useContext(ToastsContext);

    const toaster = (
        <ToastList toasts={list} removeCallback={remove} mobile={mobile ?? defaultMobile} />
    );

    if (!hasPortal) {
        return toaster;
    }

    return (
        <ToasterPortal className={className || ''} mobile={mobile ?? defaultMobile}>
            {toaster}
        </ToasterPortal>
    );
}

ToasterComponent.displayName = 'ToasterComponent';
