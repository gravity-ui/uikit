import {flatten} from 'lodash';

import {createGroupedSmokeScenarios} from './create-grouped-smoke-scenarios';
import type {Cases, CasesWithName} from './models';

interface Options {
    scenarioName?: string;
}

export const createSmokeScenarios = <Props extends {}>(
    baseProps: Props,
    propsCases: Partial<{
        [K in keyof Props]: CasesWithName<Props[K]> | Cases<Props[K]>;
    }>,
    options?: Options,
) => {
    const groupedScenarios = createGroupedSmokeScenarios(baseProps, propsCases, options);

    return flatten(groupedScenarios);
};
