import React from 'react';

import type {Decorator} from '@storybook/react';

import {useMobile} from '../../src';

export const WithMobile: Decorator = (Story, context) => {
    const mobileValue = context.globals.platform === 'mobile';

    const [, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    React.useEffect(() => {
        setMobile(mobileValue);
    }, [mobileValue]);

    return <Story {...context} />;
};
