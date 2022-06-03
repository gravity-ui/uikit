import React from 'react';
import type {DecoratorFn} from '@storybook/react';
import {useMobile} from '../../src';

export const withMobile: DecoratorFn = (Story, context) => {
    const mobileValue = context.globals.platform === 'mobile';

    const [, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    React.useEffect(() => {
        setMobile(mobileValue);
    }, [mobileValue]);

    return <Story {...context} />;
};
