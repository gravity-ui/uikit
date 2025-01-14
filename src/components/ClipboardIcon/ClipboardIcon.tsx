import {Copy, CopyCheck, CopyXmark} from '@gravity-ui/icons';

import type {CopyToClipboardStatus} from '../CopyToClipboard/types';
import {Icon} from '../Icon';
export interface ClipboardIconProps {
    size?: number;
    status: CopyToClipboardStatus;
    className?: string;
}

export function ClipboardIcon({status, ...rest}: ClipboardIconProps) {
    if (status === 'error') {
        return <Icon data={CopyXmark} {...rest} />;
    }
    if (status === 'success') {
        return <Icon data={CopyCheck} {...rest} />;
    }
    return <Icon data={Copy} {...rest} />;
}
