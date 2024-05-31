import chunk from 'lodash/chunk';

import type {Cases, Scenario, ScenarioDetails} from './models';

const CHUNK_SIZE = 3;

const generateCombinations = <T>(arr: Array<Array<T>>, index: number): Array<Array<T>> => {
    const currentItem = arr[index];
    if (currentItem === undefined) {
        return [[]];
    }

    const last = generateCombinations<T>(arr, index + 1);
    return currentItem.flatMap((item) => {
        return last.map((lastItem) => {
            return [item, ...lastItem];
        });
    });
};

interface Options {
    additionalTags?: Array<string>;
}

export const createRegressionScenarios = <Props extends {}>(
    baseProps: Props,
    propsCases: {
        [K in keyof Props]: Cases<Props[K]>;
    },
    options?: Options,
) => {
    const scenarioDetails: ScenarioDetails = {
        tag: ['@regression', ...(options?.additionalTags || [])],
    };

    const scenarios: Array<Scenario<Props>> = [
        [
            'regression',
            scenarioDetails,
            {
                ...baseProps,
            },
        ],
    ];

    const propNames = Object.keys(propsCases) as Array<keyof Props>;

    const allCases = propNames.map((propName) => {
        return propsCases[propName];
    });

    const allCasesChunks = chunk(allCases, CHUNK_SIZE);
    allCasesChunks.forEach((allCasesChunk) => {
        const allCasesChunkCombinations = generateCombinations(allCasesChunk, 0);
        allCasesChunkCombinations.forEach((cases) => {
            let scenarioName = 'regression';

            const scenarioProps = {
                ...baseProps,
            };

            cases.forEach((propCase, index) => {
                const propName = propNames[index];
                const [caseName, caseProps] = propCase;

                scenarioProps[propName] = caseProps;
                scenarioName += `-${caseName}`;
            });

            scenarios.push([scenarioName, scenarioDetails, scenarioProps]);
        });
    });

    return scenarios;
};
