import type * as React from 'react';

import {Source} from '@storybook/addon-docs';

import {getThemeType, useThemeValue} from '../..';

type DocsSourceProps = Omit<React.ComponentProps<typeof Source>, 'dark'>;

export function DocsSource(props: DocsSourceProps) {
    const themValue = useThemeValue();

    return <Source {...props} dark={getThemeType(themValue) === 'dark'} />;
}
