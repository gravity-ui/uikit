import {beforeMount} from '@playwright/experimental-ct-react/hooks';

import {ToasterProvider} from '../../src/components/Toaster';
import {MobileProvider} from '../../src/components/mobile/MobileProvider';
import {ThemeProvider} from '../../src/components/theme/ThemeProvider';
import {toaster} from '../../src/toaster-singleton';

import './index.scss';

beforeMount(async ({App}) => {
    return (
        <ThemeProvider>
            <MobileProvider>
                <ToasterProvider toaster={toaster}>
                    <App />
                </ToasterProvider>
            </MobileProvider>
        </ThemeProvider>
    );
});
