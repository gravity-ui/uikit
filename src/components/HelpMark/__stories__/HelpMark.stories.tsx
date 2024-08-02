import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {cn} from '../../utils/cn';
import {HelpMark} from '../HelpMark';
import type {HelpMarkProps} from '../HelpMark';

import './HelpMarkShowcase.scss';

const b = cn('help-mark-showcase');

export default {
    title: 'Components/Utils/HelpMark',
    id: 'components/utils/HelpMark',
    component: HelpMark,
    args: {
        buttonProps: {
            'aria-label': 'Note',
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                        // aria-labelledby id is valid after tooltip content is rendered
                        selector: 'button[aria-labelledby="helpMarkWithoutActionsId"]',
                    },
                ],
            },
        },
    },
} as Meta<typeof HelpMark>;

const DefaultTemplate: StoryFn<HelpMarkProps> = (args) => <HelpMark {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: 'Some content',
};

export const Accessible: StoryFn = (args) => {
    const helpMarkWithoutActionsId = 'helpMarkWithoutActionsId';
    const helpMarkWithActionsId = 'helpMarkWithActionsId';
    const [openPopover, setOpenPopover] = React.useState(false);
    const ref = React.useRef<HTMLButtonElement>(null);
    return (
        <div>
            <div className={b('container')}>
                <span className={b('container-title')}>Without actions: </span>
                <HelpMark
                    {...args}
                    content={'Some content'}
                    tooltipId={helpMarkWithoutActionsId}
                    aria-hidden={true}
                    buttonProps={{
                        'aria-labelledby': helpMarkWithoutActionsId,
                    }}
                />
            </div>
            <div className={b('container')}>
                <span className={b('container-title')}>With actions: </span>
                <HelpMark
                    {...args}
                    tooltipId={helpMarkWithActionsId}
                    content={<a href="https://ya.ru">Some link</a>}
                    openOnHover={false}
                    onOpenChange={setOpenPopover}
                    focusTrap
                    autoFocus
                    restoreFocusRef={ref}
                    buttonProps={{
                        'aria-expanded': openPopover,
                        'aria-controls': helpMarkWithActionsId,
                        'aria-label': 'More info',
                    }}
                    buttonRef={ref}
                />
            </div>
        </div>
    );
};
