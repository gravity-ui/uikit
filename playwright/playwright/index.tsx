import React from 'react';

import {beforeMount} from '@playwright/experimental-ct-react/hooks';

import {ToasterComponent, ToasterProvider} from '../../src/components/Toaster';
import {MobileProvider} from '../../src/components/mobile/MobileProvider';
import {ThemeProvider} from '../../src/components/theme/ThemeProvider';

import './index.scss';

beforeMount(async ({App}) => {
    return (
        <ThemeProvider>
            <MobileProvider>
                <ToasterProvider>
                    <App />
                    <ToasterComponent />
                </ToasterProvider>
            </MobileProvider>
        </ThemeProvider>
    );
});
