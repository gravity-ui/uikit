import React from 'react';

import {Ban} from '@gravity-ui/icons';

import {CopyToClipboard, Icon} from '../../components';
import {cn} from '../../components/utils/cn';

import './ColorTable.scss';

export interface ColorTableProps {
    theme: string;
}

const b = cn('color-table');

const steps: number[] = [];
for (let i = 50; i <= 1000; i += 50) {
    steps.push(i);
}
const themes = ['light', 'light-hc', 'dark', 'dark-hc'];
const tones = ['white', 'black', 'blue', 'green', 'yellow', 'orange', 'red', 'purple', 'cool-grey'];
const colors: Record<string, Record<string, number[]>> = {};

for (const theme of themes) {
    for (const tone of tones) {
        colors[theme] = colors[theme] || {};

        colors[theme][tone] = [...steps];
        colors[theme][tone + '-solid'] = [...steps];
    }
}

function getVarName(colorName: string, step: number) {
    if (colorName.includes('solid')) {
        return `--g-color-private-${colorName.replace('-solid', '')}-${step}-solid`;
    } else {
        return `--g-color-private-${colorName}-${step}`;
    }
}

function isVarExist(varName: string, style?: CSSStyleDeclaration) {
    return Boolean(style && style.getPropertyValue(varName));
}

export function ColorTable({theme}: ColorTableProps) {
    const [bodyStyle, setBodyStyle] = React.useState<CSSStyleDeclaration>();

    React.useEffect(() => {
        setBodyStyle(window.getComputedStyle(document.body));
    }, [theme]);

    return (
        <table className={b()}>
            <thead>
                <tr className={b('row')}>
                    {[null, ...steps].map((step) => (
                        <td key={step} className={b('step-name')}>
                            {step}
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(colors[theme]).map((colorName) => {
                    return (
                        <tr key={colorName} className={b('row')} data-color-name={colorName}>
                            <td className={b('color-name')}>{colorName}</td>
                            {steps.map((step) => {
                                const varName = getVarName(colorName, step);
                                const varExist = isVarExist(varName, bodyStyle);

                                const content = (
                                    <td
                                        className={b('color', {exist: varExist})}
                                        style={
                                            varExist ? {background: `var(${varName})`} : undefined
                                        }
                                        data-color-name={colorName}
                                    >
                                        {varExist ? null : <Icon data={Ban} size={20} />}
                                    </td>
                                );

                                return varExist ? (
                                    <CopyToClipboard text={`var(${varName})`} key={step} nativeCopy>
                                        {() => content}
                                    </CopyToClipboard>
                                ) : (
                                    content
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
