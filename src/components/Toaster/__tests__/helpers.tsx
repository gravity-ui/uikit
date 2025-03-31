import {TrashBin} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {Toast} from '../Toast/Toast';
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

export const TestToast = (props: ToastProps) => {
    return (
        <Toast
            {...props}
            removeCallback={() => {
                // noop
            }}
        />
    );
};

export const TestToastWithIcon = (props: ToastProps) => {
    return (
        <Toast
            {...props}
            removeCallback={() => {
                // noop
            }}
            renderIcon={() => <Icon data={TrashBin} />}
        />
    );
};
