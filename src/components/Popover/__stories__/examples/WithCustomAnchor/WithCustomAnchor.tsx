import React, {useRef, useState} from 'react';

import {Button} from '../../../../Button';
import {Popover} from '../../../';
import {Loader} from '../../../../Loader';

import {PopoverInstanceProps} from '../../../types';
import {cnPopoverDemo} from '../../PopoverDemo.classname';

export function WithCustomAnchor() {
    const [isRefTooltipVisible, setIsRefTooltipVisible] = useState(false);

    const popoverRef = useRef<PopoverInstanceProps | undefined>();
    const popoverAnchor = useRef<HTMLDivElement>(null);

    const toggleTooltip = () => {
        const instance = popoverRef.current;

        if (instance) {
            if (isRefTooltipVisible) {
                setIsRefTooltipVisible(false);
                requestAnimationFrame(() => {
                    instance.closeTooltip();
                });
            } else {
                setIsRefTooltipVisible(true);
                requestAnimationFrame(() => {
                    instance.openTooltip();
                });
            }
        }
    };

    return (
        <div className={cnPopoverDemo()}>
            <div>
                <Button onClick={toggleTooltip}>Click me</Button>
            </div>

            <div ref={popoverAnchor}>
                <div className={cnPopoverDemo('content')}>
                    <h2 className={cnPopoverDemo('title')}>Here comes tooltip bound to ref</h2>
                    <h3 className={cnPopoverDemo('text')}>
                        Click the button &laquo;Click me&raquo; above, to open it
                    </h3>
                </div>
            </div>

            <Popover
                ref={popoverRef}
                anchorRef={popoverAnchor}
                title="Infinite loading.."
                content={
                    <div className={cnPopoverDemo('loader')}>
                        <Loader size="s" />
                    </div>
                }
            />
        </div>
    );
}
