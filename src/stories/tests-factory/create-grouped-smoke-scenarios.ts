import type {Cases, CasesWithName, Scenario, ScenarioName} from './models';

interface Options {
    scenarioName?: string;
}

function checkIsCasesWithName<T>(cases: CasesWithName<T> | Cases<T>): cases is CasesWithName<T> {
    const firstCase = cases[0] || null;
    return Array.isArray(firstCase) && firstCase.length === 2;
}

export const createGroupedSmokeScenarios = <Props extends {}>(
    baseProps: Props,
    propsCases: Partial<{
        [K in keyof Props]: CasesWithName<Props[K]> | Cases<Props[K]>;
    }>,
    options?: Options,
) => {
    const scenarioName: ScenarioName = `${options?.scenarioName ? ` ${options?.scenarioName}` : ''}`;

    const groupedScenarios: Array<Array<Scenario<Props>>> = [
        [
            [
                `${scenarioName ? `${scenarioName} ` : ''}[default]`,
                {
                    ...baseProps,
                },
            ],
        ],
    ];

    const propNames = Object.keys(propsCases) as Array<keyof Props>;
    propNames.forEach((propName) => {
        const propCases = propsCases[propName];
        if (!propCases) {
            return;
        }

        const scenarioGroup: Array<Scenario<Props>> = [];

        if (checkIsCasesWithName(propCases)) {
            propCases.forEach((propCase) => {
                const [caseName, caseProps] = propCase;

                scenarioGroup.push([
                    `${scenarioName ? `${scenarioName} ` : ''}[${propName as string}: ${caseName}]`,
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

                scenarioGroup.push([
                    `${scenarioName ? `${scenarioName} ` : ''}[${propName as string}: ${(propCase as any)?.toString()}]`,
                    {
                        ...baseProps,
                        [propName]: propCase,
                    },
                ]);
            });
        }

        groupedScenarios.push(scenarioGroup);
    });

    return groupedScenarios;
};
