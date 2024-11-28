import * as React from 'react';

import {Text} from '../../components/Text';

import {getPropsCombinations} from './getPropsCombinations';
import type {PropCombination, PropSequences} from './getPropsCombinations';

type Combinations<ComponentType extends React.ElementType> = PropCombination<
    Partial<React.ComponentProps<ComponentType>>
>;

export function ShowcaseGrid<ComponentType extends React.ElementType>({
    component: Component,
    propsCombinations,
    staticProps,
    rowKey,
}: {
    component: ComponentType;
    propsCombinations: Combinations<ComponentType>;
    staticProps?: Partial<React.ComponentProps<ComponentType>>;
    rowKey?: keyof React.ComponentProps<ComponentType>;
}) {
    const combinations = React.useMemo(() => {
        return getPropsCombinations<typeof Component>({propsCombinations, staticProps});
    }, [propsCombinations, staticProps]);

    if (rowKey) {
        const names = propsCombinations[rowKey]!.map(({name}) => name);

        const rows = combinations.reduce(
            (result, combination) => {
                names.forEach((name) => {
                    if (combination.names[rowKey] === name) {
                        result[name] = result[name] || [];
                        result[name].push(combination);
                    }
                });

                return result;
            },
            {} as Record<string, PropSequences<React.ComponentProps<ComponentType>>>,
        );

        return (
            <table
                style={{
                    borderSpacing: '10px',
                }}
            >
                <tbody>
                    <tr>
                        <td></td>
                        {rows[names[0]].map((combination) => {
                            const title = Object.keys(combination.names)
                                .filter((name) => name !== rowKey)
                                .map((name) => combination.names[name])
                                .join(', ');

                            return (
                                <td key={title}>
                                    <Text variant="subheader-1">{title}</Text>
                                </td>
                            );
                        })}
                    </tr>

                    {names.map((name) => {
                        return (
                            <tr key={name}>
                                <td>
                                    <Text variant="subheader-1">{name}</Text>
                                </td>
                                {rows[name].map((combination) => {
                                    const title = Object.keys(combination.names)
                                        .map((name) => combination.names[name])
                                        .join(', ');

                                    return (
                                        <td
                                            key={title}
                                            style={{
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Component {...combination.props} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    return (
        <table>
            <tbody>
                <tr>
                    {combinations.map((combination) => {
                        const title = Object.keys(combination.names)
                            .map((name) => combination.names[name])
                            .join(', ');

                        return (
                            <td key={title}>
                                <Text variant="subheader-1">{title}</Text>
                            </td>
                        );
                    })}
                </tr>
                <tr>
                    {combinations.map((combination) => {
                        const title = Object.keys(combination.names)
                            .map((name) => combination.names[name])
                            .join(', ');

                        return (
                            <td key={title}>
                                <Component {...combination.props} />
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
}
