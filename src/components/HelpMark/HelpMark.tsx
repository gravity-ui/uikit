import * as React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Popover} from '../Popover';
import type {PopoverProps} from '../Popover';
import {Sheet} from '../Sheet';
import type {SheetProps} from '../Sheet';
import {useMobile} from '../mobile';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {ICON_SIZE_MAP} from './constants';

import './HelpMark.scss';

const b = block('help-mark');

type IconSize = keyof typeof ICON_SIZE_MAP;

export interface HelpMarkProps extends QAProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    // TODO BREAKING CHANGE: Consider renaming to "size"
    iconSize?: IconSize;
    popoverProps?: Omit<PopoverProps, 'children'>;
    sheetProps?: Omit<SheetProps, 'children' | 'visible'>;
    children?: React.ReactNode;
}

export const HelpMark = React.forwardRef<HTMLButtonElement, HelpMarkProps>(
    function HelpMark(rawProps, ref) {
        const {
            children,
            qa,
            className,
            iconSize = 'm',
            popoverProps,
            sheetProps,
            onClick,
            ...restProps
        } = useDefaultProps('HelpMark', rawProps);

        const mobile = useMobile();
        const [sheetVisible, setSheetVisible] = React.useState(false);
        const {onOpenChange: onSheetOpenChange, ...restSheetProps} = sheetProps ?? {};

        const handleMobileButtonClick = React.useCallback<
            React.MouseEventHandler<HTMLButtonElement>
        >(
            (event) => {
                onClick?.(event);

                if (!event.defaultPrevented && !sheetVisible) {
                    setSheetVisible(true);
                    onSheetOpenChange?.(true, event.nativeEvent);
                }
            },
            [onClick, onSheetOpenChange, sheetVisible],
        );

        const handleSheetOpenChange = React.useCallback<NonNullable<SheetProps['onOpenChange']>>(
            (open, event, reason) => {
                setSheetVisible(open);
                onSheetOpenChange?.(open, event, reason);
            },
            [onSheetOpenChange],
        );

        const button = (
            <button
                {...restProps}
                ref={ref}
                type="button"
                className={b({size: iconSize}, className)}
                data-qa={qa}
                aria-expanded={mobile ? sheetVisible : undefined}
                aria-haspopup={mobile ? 'dialog' : undefined}
                onClick={mobile ? handleMobileButtonClick : onClick}
            >
                <Icon data={CircleQuestion} size={ICON_SIZE_MAP[iconSize]} className={b('icon')} />
            </button>
        );

        if (mobile) {
            return (
                <React.Fragment>
                    {button}
                    <Sheet
                        {...restSheetProps}
                        visible={sheetVisible}
                        onOpenChange={handleSheetOpenChange}
                    >
                        <div className={b('sheet-content')}>{children}</div>
                    </Sheet>
                </React.Fragment>
            );
        }

        return (
            <Popover
                content={<div className={b('popover')}>{children}</div>}
                hasArrow
                {...popoverProps}
            >
                {button}
            </Popover>
        );
    },
);
