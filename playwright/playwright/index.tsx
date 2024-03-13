import React from 'react';

import {beforeMount} from '@playwright/experimental-ct-react/hooks';

import {MobileProvider} from '../../src/components/mobile/MobileProvider';
import {ThemeProvider} from '../../src/components/theme/ThemeProvider';

import './index.scss';

beforeMount(async ({App}) => {
    return (
        <ThemeProvider theme="light">
            <MobileProvider>
                <App />
            </MobileProvider>
        </ThemeProvider>
    );
});
