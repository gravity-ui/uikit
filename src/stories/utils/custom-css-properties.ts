type CssPropertyName = string;

type CssPropsProperty = {
    control: 'color' | 'text';
    description?: string;
    value?: string;
};

export const createCssProperties = (
    cssProperties: Record<
        CssPropertyName,
        {
            control: 'color' | 'text';
            description?: string;
            example?: string;
        }
    >,
) => {
    const allCSSProperties = Object.keys(cssProperties);

    const parametersCSSProps: Record<CssPropertyName, CssPropsProperty> = {};
    const customStoryCSSProps: Record<CssPropertyName, CssPropsProperty> = {};

    allCSSProperties.forEach((cssPropertyKey) => {
        const cssProperty = cssProperties[cssPropertyKey];

        customStoryCSSProps[cssPropertyKey] = {
            control: cssProperty.control,
            description: cssProperty.description,
            value: cssProperty.example,
        };

        const exampleDescription = cssProperty.example ? ` (Ex. "${cssProperty.example}")` : '';

        if (cssProperty.control === 'color') {
            parametersCSSProps[cssPropertyKey] = {
                control: cssProperty.control,
                description: cssProperty.description + exampleDescription,
            };
        }

        if (cssProperty.control === 'text') {
            parametersCSSProps[cssPropertyKey] = {
                control: cssProperty.control,
                description: cssProperty.description + exampleDescription,
                value: '',
            };
        }
    });

    return {
        cssPropertiesParameters: {
            cssprops: parametersCSSProps,
        },
        customStoryCSSPropertiesParameters: {
            cssprops: customStoryCSSProps,
        },
    };
};
