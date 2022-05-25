import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import {Showcase} from '../Showcase';
import './Private.scss';

let steps: number[] = [];
for (let i = 50; i <= 1000; i += 50) {
    steps.push(i);
}
steps = steps.reverse();

const light = {
    white: [150, 300, 500, 700, 850, 950, 1000],
    black: [50, 100, 150, 250, 300, 500, 550, 700, 850],
    'black-solid': [50, 100, 150, 700],
    blue: [50, 100, 300, 450, 550, 600, 800],
    'blue-solid': [50, 100, 450],
    green: [50, 100, 150, 200, 300, 450, 550, 600],
    'green-solid': [450],
    yellow: [100, 200, 550, 600, 650, 700, 800],
    red: [50, 100, 300, 450, 500, 550],
    'red-solid': [450],
    purple: [550],
    'cool-grey': [50, 100, 300, 450, 550, 800],
    'cool-grey-solid': [450],
    orange: [50, 100, 300, 450, 550],
} as Record<string, number[]>;

const dark = {
    white: [50, 100, 150, 250, 300, 500, 700, 850],
    'white-solid': [100, 150, 200],
    'white-opaque': [150],
    black: [200, 300, 400, 500, 700, 900],
    'black-rock': [850],
    blue: [100, 150, 300, 450, 550, 700, 850],
    'blue-solid': [150, 300, 450],
    green: [100, 150, 300, 450, 550],
    'green-solid': [450],
    yellow: [100, 150, 450, 550, 700],
    red: [100, 150, 300, 450, 550],
    'red-solid': [450],
    purple: [550],
    'cool-grey': [100, 150, 300, 450, 550, 700],
    'cool-grey-solid': [450],
    orange: [50, 100, 150, 300, 450, 550],
    'orange-solid': [450],
} as Record<string, number[]>;

interface RenderPrivateProps {
    theme?: 'light' | 'dark';
}

export function RenderPrivate({theme = 'light'}: RenderPrivateProps) {
    return (
        <Showcase
            title="Basic colors"
            description="Private palette: colors are not for usage in services and components."
        >
            {renderColorTable(theme)}
        </Showcase>
    );
}

const renderColorTable = (theme: 'light' | 'dark') => {
    const colors = theme === 'dark' ? dark : light;

    const renderHeading = () => {
        return (
            <tr className="color-table__row">
                {[null, ...steps].map((step) => {
                    if (step === null) {
                        return <td className="color-table__step-name" />;
                    } else {
                        return (
                            <td key={step} className="color-table__step-name">
                                {step}
                            </td>
                        );
                    }
                })}
            </tr>
        );
    };

    const getClassName = (colorName: string, step: number) => {
        if (colorName.includes('solid')) {
            return `--yc-color-private-${colorName.replace('-solid', '')}-${step}-solid`;
        } else {
            return `--yc-color-private-${colorName}-${step}`;
        }
    };

    const renderSteps = (colorName: string) => {
        return steps.map((step) => {
            const varName = getClassName(colorName, step);
            const style = {background: `var(${varName})`};
            const active = colors[colorName].includes(step) ? 'color-table__color_active' : '';

            return (
                <ReactCopyToClipboard text={varName} key={step}>
                    <td
                        className={`color-table__color ${active}`}
                        style={style}
                        data-color-name={colorName}
                    />
                </ReactCopyToClipboard>
            );
        });
    };

    return (
        <table className="color-table">
            {renderHeading()}
            {Object.keys(colors).map((colorName) => {
                return (
                    <tr className="color-table__row" data-color-name={colorName} key={colorName}>
                        <td className="color-table__color-name">{colorName}</td>
                        {renderSteps(colorName)}
                    </tr>
                );
            })}
        </table>
    );
};
