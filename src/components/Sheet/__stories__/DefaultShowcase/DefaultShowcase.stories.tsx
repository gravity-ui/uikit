import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button, Checkbox, TextInput} from '../../../';
import {cn} from '../../../utils/cn';
import {Sheet} from '../../Sheet';
import type {SheetProps} from '../../Sheet';
import {DEFAULT_SHEET_QA} from '../constants';

import './DefaultShowcase.scss';

const b = cn('sheet-stories-default-showcase');

const getRandomText = (length: number) => {
    let result = '';

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
};

const EXTRA_OUTER_CONTENT = getRandomText(8000);
const EXTRA_INNER_CONTENT = getRandomText(500);
const EXTRA_INNER_CONTENT_MORE_THAN_VIEWPORT = getRandomText(3000);

export default {
    title: 'Components/Overlays/Sheet',
    component: Sheet,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div className={'sb-show-main sb-main-padded'}>
                <Story />
            </div>
        ),
    ],
} as Meta;

export const Default: StoryFn<SheetProps> = ({
    allowHideOnContentScroll = false,
    ...args
}: SheetProps) => {
    const [visible, setVisible] = React.useState(false);
    const [withExtraOuterContent, setWithExtraOuterContent] = React.useState(false);
    const [withExtraInnerContent, setWithExtraInnerContent] = React.useState(false);
    const [withExtraInnerContentMoreThenViewport, setWithExtraInnerContentMoreThenViewport] =
        React.useState(false);
    const [withTitle, setWithTitle] = React.useState(false);

    return (
        <div className={b()}>
            <div className={b('show-btn')}>
                <Button onClick={() => setVisible(true)}>Show modal</Button>
            </div>
            <div className={b('content-item', b('checkbox'))}>
                <Checkbox
                    content="Show extra content"
                    onUpdate={() => setWithExtraOuterContent(!withExtraOuterContent)}
                    checked={withExtraOuterContent}
                />
            </div>
            <div className={b('content-item', b('checkbox'))}>
                <Checkbox
                    content="Show title in sheet"
                    onUpdate={() => setWithTitle(!withTitle)}
                    checked={withTitle}
                />
            </div>
            {withExtraOuterContent && (
                <div className={b('extra-content')}>{EXTRA_OUTER_CONTENT}</div>
            )}
            <Sheet
                {...args}
                allowHideOnContentScroll={allowHideOnContentScroll}
                visible={visible}
                onClose={() => setVisible(false)}
                title={withTitle ? 'Sheet title' : undefined}
                qa={DEFAULT_SHEET_QA}
            >
                <div className={b('content-item')}>
                    <TextInput />
                </div>
                <div className={b('content-item', b('checkbox'))}>
                    <Checkbox
                        content="Extra content"
                        onUpdate={() => {
                            setWithExtraInnerContent(!withExtraInnerContent);
                            setWithExtraInnerContentMoreThenViewport(false);
                        }}
                        checked={withExtraInnerContent}
                    />
                </div>
                <div className={b('content-item', b('checkbox'))}>
                    <Checkbox
                        content="Extra content more then viewport"
                        onUpdate={() => {
                            setWithExtraInnerContentMoreThenViewport(
                                !withExtraInnerContentMoreThenViewport,
                            );
                            setWithExtraInnerContent(false);
                        }}
                        checked={withExtraInnerContentMoreThenViewport}
                    />
                </div>
                {withExtraInnerContent && (
                    <div className={b('content-item', b('extra-content'))}>
                        {EXTRA_INNER_CONTENT}
                    </div>
                )}
                {withExtraInnerContentMoreThenViewport && (
                    <div className={b('content-item', b('extra-content'))}>
                        {EXTRA_INNER_CONTENT_MORE_THAN_VIEWPORT}
                    </div>
                )}
                <Button
                    view="action"
                    size="s"
                    width="max"
                    onClick={() => setVisible(false)}
                    className={b('content-item')}
                >
                    Action
                </Button>
            </Sheet>
        </div>
    );
};
