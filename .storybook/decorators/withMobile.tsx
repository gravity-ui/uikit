import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Story as StoryType, StoryContext} from '@storybook/react';
import {useMobile} from '../../src/components/mobile';

export function withMobile(Story: StoryType, context: StoryContext) {
    const mobileValue = context.globals.platform === 'mobile';

    const [mobile, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    if (mobile !== mobileValue) {
        setMobile(mobileValue);
    }

    return (
        <Router>
            <Story {...context} />
        </Router>
    );
}
