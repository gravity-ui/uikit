import type {Cases, Scenario, ScenarioDetails} from './models';

interface Options {
    additionalTags?: Array<string>;
}

export const createSmokeScenarios = <Props extends {}>(
    baseProps: Props,
    propsCases: {
        [K in keyof Props]: Cases<Props[K]>;
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
        const propCases: Cases<Props[typeof propName]> = propsCases[propName] || [];
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
    });

    return scenarios;
};
