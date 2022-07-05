import React from 'react';
import {useMobile} from '../../mobile';
import {ToastList} from '../ToastList/ToastList';
import {ToasterContext} from '../Provider/ToasterContext';
import {ToasterPortal} from './ToasterPortal';

interface Props {
    className?: string;
    mobile?: boolean;
    hasPortal?: boolean;
}

export function ToasterComponent({className, mobile, hasPortal = true}: Props) {
    const [defaultMobile] = useMobile();
    const {list, remove} = React.useContext(ToasterContext);

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
