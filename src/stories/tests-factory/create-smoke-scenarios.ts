import type {Cases, CasesWithName, Scenario, ScenarioDetails} from './models';

interface Options {
    additionalTags?: Array<string>;
}

function checkIsCasesWithName<T>(cases: CasesWithName<T> | Cases<T>): cases is CasesWithName<T> {
    const firstCase = cases[0] || null;
    return Array.isArray(firstCase) && firstCase.length === 2;
}

export const createSmokeScenarios = <Props extends {}>(
    baseProps: Props,
    propsCases: {
        [K in Partial<keyof Props>]: CasesWithName<Props[K]> | Cases<Props[K]>;
    },
    options?: Options,
) => {
    const scenarioDetails: ScenarioDetails = {
        tag: ['@smoke', ...(options?.additionalTags || [])],
    };

    const scenarios: Array<Scenario<Props>> = [
        [
            'smoke',
            scenarioDetails,
            {
                ...baseProps,
            },
        ],
    ];

    const propNames = Object.keys(propsCases) as Array<keyof Props>;
    propNames.forEach((propName) => {
        const propCases = propsCases[propName];

        if (checkIsCasesWithName(propCases)) {
            propCases.forEach((propCase) => {
                const [caseName, caseProps] = propCase;

                scenarios.push([
                    `smoke-${propName as string}-${caseName}`,
                    scenarioDetails,
                    {
                        ...baseProps,
                        [propName]: caseProps,
                    },
                ]);
            });
        } else {
            propCases.forEach((propCase) => {
                const hasStringifyMethod = (propCase as any)?.toString;
                if (!hasStringifyMethod) {
                    throw new Error(
                        'The case value does not have a method "toString", use case with name.',
                    );
                }

                scenarios.push([
                    `smoke-${propName as string}-${(propCase as any)?.toString()}`,
                    scenarioDetails,
                    {
                        ...baseProps,
                        [propName]: propCase,
                    },
                ]);
            });
        }
    });

    return scenarios;
};
