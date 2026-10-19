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
    const [open, setOpen] = React.useState(false);
    const [moreContentOpen, setMoreContentOpen] = React.useState(false);

    return (
        <div className={b()}>
            <Button className={b('show-btn')} onClick={() => setOpen(true)}>
                Show modal
            </Button>
            <Sheet {...args} open={open} id="main" onOpenChange={setOpen}>
                <img
                    src="https://avatars.githubusercontent.com/u/107542106"
                    width="100%"
                    alt="example"
                />
                <Button
                    size="xl"
                    width="max"
                    className={b('show-btn')}
                    onClick={() => setMoreContentOpen(true)}
                >
                    Show one more modal
                </Button>
            </Sheet>
            <Sheet
                {...args}
                id="more-content"
                open={moreContentOpen}
                onOpenChange={setMoreContentOpen}
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
                        onClick={() => setMoreContentOpen(false)}
                    >
                        Close
                    </Button>
                </div>
            </Sheet>
        </div>
    );
};
