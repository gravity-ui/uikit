import React from 'react';
import block from 'bem-cn-lite';
import {Story} from '@storybook/react';
import {Button, Checkbox} from '../../../';
import {Sheet, SheetProps} from '../../Sheet';

import './DefaultShowcase.scss';

const b = block('sheet-stories-default-showcase');

const getRandomText = (length: number) => {
    let result = '';

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
};

const EXTRA_OUTER_CONTENT = getRandomText(8000);
const EXTRA_INNER_CONTENT = getRandomText(1000);

export const Showcase: Story<SheetProps> = (args: SheetProps) => {
    const [visible, setVisible] = React.useState(false);
    const [withExtraOuterContent, setWithExtraOuterContent] = React.useState(false);
    const [withExtraInnerContent, setWithExtraInnerContent] = React.useState(false);

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
            {withExtraOuterContent && (
                <div className={b('extra-content')}>{EXTRA_OUTER_CONTENT}</div>
            )}
            <Sheet {...args} visible={visible} onClose={() => setVisible(false)}>
                <div className={b('content-item', b('checkbox'))}>
                    <Checkbox
                        content="Extra content"
                        onUpdate={() => setWithExtraInnerContent(!withExtraInnerContent)}
                        checked={withExtraInnerContent}
                    />
                </div>
                {withExtraInnerContent && (
                    <div className={b('content-item', b('extra-content'))}>
                        {EXTRA_INNER_CONTENT}
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
