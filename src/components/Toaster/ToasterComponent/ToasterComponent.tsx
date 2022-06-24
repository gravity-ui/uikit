import React, {useContext} from 'react';
import {ToastList} from '../ToastList/ToastList';
import {ToasterContext} from '../ToasterContext';
import {ToasterPortal} from './ToasterPortal';

interface Props {
    className?: string;
    mobile?: boolean;
    hasPortal?: boolean;
}

export function ToasterComponent({className, mobile, hasPortal = true}: Props) {
    const {list, remove} = useContext(ToasterContext);

    const toaster = <ToastList toasts={list} removeCallback={remove} mobile={mobile} />;

    if (!hasPortal) {
        return toaster;
    }

    return (
        <ToasterPortal className={className || ''} mobile={mobile}>
            {toaster}
        </ToasterPortal>
    );
}

ToasterComponent.displayName = 'ToasterComponent';
