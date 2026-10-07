import {beforeMount} from '@playwright/experimental-ct-react/hooks';

import {ToasterProvider} from '../../src/components/Toaster';
import {Provider} from '../../src/components/theme/Provider';
import {toaster} from '../../src/toaster-singleton';

import './index.scss';

beforeMount(async ({App}) => {
    return (
        <Provider>
            <ToasterProvider toaster={toaster}>
                <App />
            </ToasterProvider>
        </Provider>
    );
});
