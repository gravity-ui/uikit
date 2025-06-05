import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button} from '../../..';
import {cn} from '../../../utils/cn';
import {Sheet} from '../../Sheet';
import type {SheetProps} from '../../Sheet';

import './MultipleSheets.scss';

const b = cn('sheet-stories-with-multiple-sheets');

export default {
    title: 'Components/Overlays/Sheet',
    component: Sheet,
} as Meta;

export const MultipleSheets: StoryFn<SheetProps> = (args: SheetProps) => {
    const [visible, setVisible] = React.useState(false);
    const [moreContentVisible, setMoreContentVisible] = React.useState(false);

    return (
        <div className={b()}>
            <Button className={b('show-btn')} onClick={() => setVisible(true)}>
                Show modal
            </Button>
            <Sheet {...args} visible={visible} id="main" onClose={() => setVisible(false)}>
                <img
                    src="https://avatars.githubusercontent.com/u/107542106"
                    width="100%"
                    alt="example"
                />
                <Button
                    size="xl"
                    width="max"
                    className={b('show-btn')}
                    onClick={() => setMoreContentVisible(true)}
                >
                    Show one more modal
                </Button>
            </Sheet>
            <Sheet
                {...args}
                id="more-content"
                visible={moreContentVisible}
                onClose={() => setMoreContentVisible(false)}
            >
                <div className={b('text')}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam consequatur
                    quasi quo temporibus. Optio tenetur, aliquam ratione natus asperiores
                    necessitatibus? Cumque nulla nesciunt esse minus cum nam rerum illum dicta.
                </div>
                <div>
                    <Button
                        size="xl"
                        width="max"
                        className={b('show-btn')}
                        onClick={() => setMoreContentVisible(false)}
                    >
                        Close
                    </Button>
                </div>
            </Sheet>
        </div>
    );
};
