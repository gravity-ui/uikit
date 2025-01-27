export type PropCombination<PropType> = {
    [key in keyof PropType]: Array<PropWithItName<PropType[key]>>;
};

interface PropWithItName<PropType> {
    name: string;
    value: PropType;
}

export type PropSequences<PropType> = Array<PropSequence<PropType>>;

type PropSequence<PropType> = {
    names: PropSequenceNames<PropType>;
    props: PropType;
};

type PropSequenceNames<PropType> = {
    [key in keyof PropType]: string;
};

export function getPropsCombinations<ComponentType extends React.ElementType>({
    propsCombinations,
    staticProps,
}: {
    propsCombinations: PropCombination<Partial<React.ComponentProps<ComponentType>>>;
    staticProps?: Partial<React.ComponentProps<ComponentType>>;
}) {
    const propNames: Array<keyof typeof propsCombinations> = Object.keys(propsCombinations);

    const firstPropName = propNames[0];

    let cache: PropSequences<React.ComponentProps<ComponentType>> = propsCombinations[
        firstPropName
    ]!.map(({name, value}) => {
        return {
            names: {
                [firstPropName]: name,
            } as PropSequenceNames<React.ComponentProps<ComponentType>>,
            props: {
                [firstPropName]: value,
                ...staticProps,
            } as React.ComponentProps<ComponentType>,
        };
    });

    for (let i = 1; i < propNames.length; i++) {
        const newCombination = cache.reduce<PropSequences<React.ComponentProps<ComponentType>>>(
            (result, combination) => {
                propsCombinations[propNames[i]]!.forEach((item) => {
                    result.push({
                        names: {
                            ...combination.names,
                            [propNames[i]]: item.name,
                        },
                        props: {
                            ...combination.props,
                            [propNames[i]]: item.value,
                        },
                    });
                });

                return result;
            },
            [],
        );

        cache = newCombination;
    }

    return cache;
}
