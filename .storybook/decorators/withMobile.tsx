import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react';
import {useMobile} from '../../src/components/mobile';

export function withMobile(Story: StoryType, context: StoryContext) {
    const mobileValue = context.globals.platform === 'mobile';

    const [, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    React.useEffect(() => {
        setMobile(mobileValue);
    }, [mobileValue]);

    return <Story {...context} />;
}
