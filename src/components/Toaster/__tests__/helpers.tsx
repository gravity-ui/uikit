import React from 'react';

import {TrashBin} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {ToasterComponent} from '../ToasterComponent/ToasterComponent';
import {useToaster} from '../hooks/useToaster';
import type {ToastProps} from '../types';

import {ToasterQA} from './constants';

const TestToasterTrigger = (props: {toastProps: ToastProps}) => {
    const toaster = useToaster();

    const handleClick = () => {
        toaster.add(props.toastProps);
    };

    return (
        <button data-qa={ToasterQA.trigger} onClick={handleClick}>
            trigger
        </button>
    );
};

export const TestToaster = (props: {toastProps: ToastProps}) => {
    return (
        <ToasterProvider>
            <TestToasterTrigger toastProps={props.toastProps} />
            <ToasterComponent hasPortal={false} />
        </ToasterProvider>
    );
};

export const TestToasterWithIcons = (props: {toastProps: ToastProps}) => {
    return (
        <ToasterProvider>
            <TestToasterTrigger
                toastProps={{
                    ...props.toastProps,
                    renderIcon: () => <Icon data={TrashBin} />,
                }}
            />
            <ToasterComponent hasPortal={false} />
        </ToasterProvider>
    );
};
