import React from 'react';

import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import { ClipboardIcon } from '../ClipboardIcon';
import { CopyToClipboard } from '../CopyToClipboard';
import { CopyToClipboardStatus } from '../CopyToClipboard/types';
import type { CopyToClipboardBaseProps } from '../CopyToClipboard/types';
import type { QAProps } from '../types';
import { block } from '../utils/cn';
import { Tooltip, TooltipProps } from '../Tooltip';

import './ClipboardButton.scss';

export interface ClipboardButtonProps
    extends CopyToClipboardBaseProps,
    Omit<ClipboardButtonComponentProps, 'status' | 'onClick'>,
    QAProps {
    /** Time to restore initial state, ms */
    timeout?: number;
}

interface ClipboardButtonComponentProps extends QAProps {
    /** Icon size in pixels */
    size?: number;
    /** Element CSS class */
    className?: string;
    status: CopyToClipboardStatus;
    onClick?: ButtonProps['onClick'];
    /** tooltip component pops */
    tooltipProps?: ClipboardButtonTooltipProps;
}

interface ClipboardButtonTooltipProps extends Omit<TooltipProps, 'content' | 'children'> {
    /** Text shown before copy */
    startCopyTip?: string;
    /** Text shown after copy */
    endCopyTip?: string;
}

const b = block('clipboard-button');

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_TIMEOUT = 1000;
const DEFAULT_START_COPY_TIP = 'Copy';
const DEFAULT_END_COPY_TIP = 'Copied!';

const ClipboardButtonComponent: React.FC<ClipboardButtonComponentProps> = (props) => {
    const {size = DEFAULT_ICON_SIZE, className, qa, tooltipProps = {}, status, onClick} = props;
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        buttonRef?.current?.style.setProperty('--yc-button-height', `${size}px`);
    }, [size]);
    const {
        startCopyTip = DEFAULT_START_COPY_TIP,
        endCopyTip = DEFAULT_END_COPY_TIP,
        ...restTooltipProps
    } = tooltipProps;

    return (
        <Tooltip
            {...restTooltipProps}
            content={status === CopyToClipboardStatus.Success ? endCopyTip : startCopyTip}
        >
            <Button
                ref={buttonRef}
                view="flat"
                className={b(null, className)}
                qa={qa}
                onClick={onClick}
            >
                <Button.Icon>
                    <ClipboardIcon status={status} size={size} className={b('icon')} />
                </Button.Icon>
            </Button>
        </Tooltip>
    );
};

export function ClipboardButton(props: ClipboardButtonProps) {
    const { text, timeout = DEFAULT_TIMEOUT, onCopy, options, ...buttonProps } = props;
    return (
        <CopyToClipboard text={text} timeout={timeout} onCopy={onCopy} options={options}>
            {(status) => <ClipboardButtonComponent {...buttonProps} status={status} />}
        </CopyToClipboard>
    );
}
