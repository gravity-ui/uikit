import * as React from 'react';

import {Bulb} from '@gravity-ui/icons';

import {ActionTooltip, Button, ClipboardButton, Icon} from '../../components';
import {cn} from '../../components/utils/cn';

import './ColorPanel.scss';

interface ColorInfo {
    name: string;
    title: string;
    description: string;
}

interface ColorPanelProps {
    title: string;
    description: string;
    colors: ColorInfo[];
    boxBorders?: boolean;
    defaultBackground?: 'normal' | 'brand' | 'dark';
}

const b = cn('color-panel');
const BACKGROUND_LIST = ['normal', 'brand', 'dark'];
const switchBackgroundTitle = 'Switch background';

function getColorVarName(name: string) {
    return `--g-color-${name}`;
}

function shouldColorizeTitle(name: string) {
    return name.startsWith('text-') && name !== 'text-primary';
}

export function ColorPanel(props: ColorPanelProps) {
    const initialIndex = props.defaultBackground
        ? BACKGROUND_LIST.indexOf(props.defaultBackground)
        : 0;
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = React.useState(
        initialIndex >= 0 ? initialIndex : 0,
    );

    function rotateBackground() {
        setCurrentBackgroundIndex((index) => (index + 1) % BACKGROUND_LIST.length);
    }

    function renderColors(colors: ColorInfo[]) {
        return colors.map((color) => {
            const varName = getColorVarName(color.name);
            const copyText = `var(${varName})`;
            const titleStyle = shouldColorizeTitle(color.name)
                ? {color: `var(${varName})`}
                : undefined;

            return (
                <div className={b('item')} key={color.name}>
                    <div className={b('item-content')}>
                        <div
                            className={b('swatch', {bordered: props.boxBorders})}
                            style={{backgroundColor: `var(${varName})`}}
                        />
                        <div className={b('item-texts')}>
                            <div className={b('item-title')} style={titleStyle}>
                                {color.title}
                            </div>
                            <div className={b('item-description')}>{color.description}</div>
                        </div>
                    </div>
                    <div className={b('code-block')}>
                        <pre className={b('code')}>{copyText}</pre>
                        <ClipboardButton
                            text={copyText}
                            view="flat"
                            size="xs"
                            className={b('copy-button')}
                        />
                    </div>
                </div>
            );
        });
    }

    const currentBackground = BACKGROUND_LIST[currentBackgroundIndex];
    const switcherView = currentBackground === 'normal' ? 'outlined' : 'outlined-contrast';

    return (
        <div className={b({bg: currentBackground})}>
            <div className={b('header')}>
                <div className={b('header-content')}>
                    <div className={b('title')}>{props.title}</div>
                    {props.description && (
                        <div className={b('description')}>{props.description}</div>
                    )}
                </div>
                <ActionTooltip title={switchBackgroundTitle}>
                    <Button
                        view={switcherView}
                        size="s"
                        className={b('bg-switcher')}
                        onClick={rotateBackground}
                    >
                        <Icon data={Bulb} />
                    </Button>
                </ActionTooltip>
            </div>
            <div className={b('colors')}>{renderColors(props.colors)}</div>
        </div>
    );
}
