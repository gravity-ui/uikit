import React from 'react';

import {beforeMount} from '@playwright/experimental-ct-react/hooks';

import {ToasterProvider} from '../../src/components/Toaster';
import {ThemeProvider} from '../../src/components/theme/ThemeProvider';

import './index.scss';

beforeMount(async ({App}) => {
    return (
        <ThemeProvider>
            <ToasterProvider>
                <App />
            </ToasterProvider>
        </ThemeProvider>
    );
});
